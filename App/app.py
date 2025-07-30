from flask import Flask, request, jsonify
from twilio.twiml.messaging_response import MessagingResponse
import os
from openai import OpenAI
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from datetime import datetime, timedelta, timezone
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Initialize Supabase
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize Google Calendar (stub for now)
GOOGLE_CALENDAR_ID = os.getenv('GOOGLE_CALENDAR_ID')

def detect_language_and_extract_info(message):
    """Use GPT-4o to detect language and extract customer information"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": """You are a language detection and information extraction assistant. 
                    Analyze the message and return ONLY a valid JSON object with these exact fields:
                    {
                        "detected_language": "en" or "fr",
                        "booking_intent": true or false,
                        "name_extracted": "name" or null,
                        "name_prompted": true or false
                    }
                    
                    Do not include any other text, only the JSON object."""
                },
                {
                    "role": "user",
                    "content": f"Analyze this message: {message}"
                }
            ],
            temperature=0.1
        )
        
        content = response.choices[0].message.content.strip()
        # Try to extract JSON if there's extra text
        if content.startswith('{') and content.endswith('}'):
            result = json.loads(content)
        else:
            # Try to find JSON in the response
            start = content.find('{')
            end = content.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = content[start:end]
                result = json.loads(json_str)
            else:
                raise ValueError("No valid JSON found in response")
        
        return result
    except Exception as e:
        print(f"Error in language detection: {e}")
        return {
            "detected_language": "en",
            "booking_intent": False,
            "name_extracted": None,
            "name_prompted": False
        }

def generate_ai_response(message, language, customer_name=None, booking_intent=False):
    """Generate AI response based on message context"""
    try:
        system_prompt = f"""You are a friendly AI assistant for a barbershop. 
        Respond in {language.upper()} language.
        Be helpful, professional, and encourage booking appointments.
        Keep responses concise and natural for SMS.
        If customer name is provided: {customer_name}
        Booking intent detected: {booking_intent}"""
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return "Thank you for your message. We'll get back to you soon!"

def log_message_to_supabase(phone, message, detected_language, booking_intent, 
                           name_extracted, gpt_reply, name_prompted=False):
    """Log message and AI response to Supabase"""
    try:
        data = {
            "phone": phone,
            "message": message,
            "detected_language": detected_language,
            "booking_intent": booking_intent,
            "name_extracted": name_extracted,
            "gpt_reply": gpt_reply,
            "name_prompted": name_prompted,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        
        result = supabase.table('message_logs').insert(data).execute()
        return result
    except Exception as e:
        print(f"Error logging to Supabase: {e}")
        return None

def get_or_create_customer(phone, name=None):
    """Get existing customer or create new one"""
    try:
        # Check if customer exists
        result = supabase.table('customers').select('*').eq('phone', phone).execute()
        
        if result.data:
            customer = result.data[0]
            # Update name if provided and different
            if name and name != customer.get('name'):
                supabase.table('customers').update({'name': name}).eq('id', customer['id']).execute()
            return customer
        else:
            # Create new customer
            data = {
                "phone": phone,
                "name": name,
                "customer_uid": f"cust_{phone.replace('+', '').replace('-', '').replace(' ', '')}"
            }
            result = supabase.table('customers').insert(data).execute()
            return result.data[0] if result.data else None
    except Exception as e:
        print(f"Error with customer management: {e}")
        return None

def check_calendar_availability(date_str, time_str=None):
    """Check Google Calendar availability (stub implementation)"""
    try:
        # This is a stub - in production, you'd integrate with Google Calendar API
        # For now, return mock availability
        return {
            "available": True,
            "available_slots": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
            "message": "We have several slots available on that date."
        }
    except Exception as e:
        print(f"Error checking calendar: {e}")
        return {"available": False, "message": "Unable to check availability at this time."}

@app.route('/sms', methods=['POST'])
def handle_sms():
    """Handle incoming SMS messages"""
    try:
        # Get message details from Twilio
        incoming_message = request.values.get('Body', '')
        from_number = request.values.get('From', '')
        
        print(f"Received SMS from {from_number}: {incoming_message}")
        
        # Detect language and extract information
        analysis = detect_language_and_extract_info(incoming_message)
        detected_language = analysis.get('detected_language', 'en')
        booking_intent = analysis.get('booking_intent', False)
        name_extracted = analysis.get('name_extracted')
        name_prompted = analysis.get('name_prompted', False)
        
        # Get or create customer
        customer = get_or_create_customer(from_number, name_extracted)
        
        # Generate AI response
        ai_response = generate_ai_response(
            incoming_message, 
            detected_language, 
            customer.get('name') if customer else None,
            booking_intent
        )
        
        # Log message to Supabase
        log_message_to_supabase(
            from_number,
            incoming_message,
            detected_language,
            booking_intent,
            name_extracted,
            ai_response,
            name_prompted
        )
        
        # Create Twilio response
        resp = MessagingResponse()
        resp.message(ai_response)
        
        return str(resp)
        
    except Exception as e:
        print(f"Error handling SMS: {e}")
        resp = MessagingResponse()
        resp.message("Sorry, we're experiencing technical difficulties. Please try again later.")
        return str(resp)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "services": {
            "openai": "configured" if os.getenv('OPENAI_API_KEY') else "missing",
            "supabase": "configured" if os.getenv('SUPABASE_URL') and os.getenv('SUPABASE_KEY') else "missing",
            "twilio": "configured" if os.getenv('TWILIO_ACCOUNT_SID') else "missing"
        }
    })

@app.route('/test', methods=['GET'])
def test_endpoint():
    """Test endpoint for development"""
    return jsonify({
        "message": "AutoRépondeur Pro is running!",
        "endpoints": {
            "sms": "/sms (POST)",
            "health": "/health (GET)",
            "test": "/test (GET)"
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
