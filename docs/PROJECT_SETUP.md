# BookingBuddy Backend - Project Setup Guide

## 🎯 Project Overview

BookingBuddy Backend is an AI-powered SMS assistant for small businesses (e.g., barbershops) that:

- Responds to customer texts via Twilio
- Detects language (French/English) using GPT-4o
- Extracts customer names from messages
- Logs conversation history in Supabase
- Integrates with Google Calendar for booking management

## 📁 Project Structure

```
BookingBuddy-pro/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── .env                           # Environment variables (create from template)
├── env_template.txt               # Environment variables template
├── test_app.py                    # Test script for development
├── calendar_test.py               # Google Calendar integration test
├── google-calendar-credentials.json # Google Calendar service account
├── index.html                     # Simple web interface
├── README.md                      # Main project documentation
├── PROJECT_SETUP.md               # This file - setup guide
├── .gitignore                     # Git ignore rules
└── venv/                          # Python virtual environment
```

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp env_template.txt .env

# Edit .env with your API keys
nano .env
```

Required environment variables:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here

# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your_google_calendar_id_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### 2. Install Dependencies

```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

Create these tables in your Supabase project:

#### customers table
```sql
CREATE TABLE public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_uid text NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  phone text NOT NULL,
  name text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT customers_pkey PRIMARY KEY (id)
);
```

#### message_logs table
```sql
CREATE TABLE public.message_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  message text,
  detected_language text,
  booking_intent boolean DEFAULT false,
  name_extracted text,
  gpt_reply text,
  timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()),
  name_prompted boolean DEFAULT false,
  CONSTRAINT message_logs_pkey PRIMARY KEY (id)
);
```

#### messages table
```sql
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_uid text,
  phone text NOT NULL,
  name text,
  message text,
  reply text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_customer_uid_fkey FOREIGN KEY (customer_uid) REFERENCES public.customers(customer_uid)
);
```

#### bookings table
```sql
CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_uid text,
  booked_date date NOT NULL,
  booked_time time without time zone,
  status text DEFAULT 'confirmed'::text,
  cancel_reason text,
  deposit_paid boolean DEFAULT false,
  deposit_amount numeric DEFAULT 0.00,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone,
  CONSTRAINT bookings_pkey PRIMARY KEY (id),
  CONSTRAINT bookings_customer_uid_fkey FOREIGN KEY (customer_uid) REFERENCES public.customers(customer_uid)
);
```

### 4. Run the Application

```bash
# Start Flask app
python app.py

# In another terminal, start ngrok
ngrok http 5000
```

### 5. Configure Twilio Webhook

1. Go to Twilio Console
2. Set webhook URL to: `https://your-ngrok-url.ngrok-free.app/sms`
3. Method: POST

## 🔧 External Services Setup

### OpenAI
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env` as `OPENAI_API_KEY`

### Twilio
1. Create account at [Twilio](https://www.twilio.com/)
2. Get Account SID and Auth Token from console
3. Purchase a phone number
4. Add credentials to `.env`

### Supabase
1. Create project at [Supabase](https://supabase.com/)
2. Get project URL and anon key
3. Create the required tables (see above)
4. Add credentials to `.env`

### Google Calendar (Optional)
1. Create service account in Google Cloud Console
2. Download credentials JSON file
3. Share calendar with service account email
4. Add calendar ID to `.env`

## 🧪 Testing

### Test the Application
```bash
# Run test suite
python test_app.py

# Test health endpoint
curl http://localhost:5000/health

# Test SMS endpoint
curl -X POST http://localhost:5000/sms \
  -d "Body=Hello, I need a haircut" \
  -d "From=+1234567890"
```

### Test with ngrok
1. Start ngrok: `ngrok http 5000`
2. Copy the public URL
3. Configure Twilio webhook
4. Send SMS to your Twilio number

## 📊 API Endpoints

- `POST /sms` - Handle incoming SMS messages
- `GET /health` - Health check endpoint
- `GET /test` - Test endpoint for development

## 🔍 Monitoring

### Flask Console
- Real-time SMS processing logs
- Error messages and debugging info

### Supabase Dashboard
- View conversation history in `message_logs` table
- Check customer data in `customers` table
- Monitor booking information in `bookings` table

### ngrok Dashboard
- Monitor incoming requests at `http://localhost:4040`
- View request/response details

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure all API keys are set in `.env`
2. **Supabase Connection**: Verify URL and key are correct
3. **Twilio Webhook**: Check ngrok URL is accessible
4. **OpenAI API**: Ensure API key has sufficient credits

### Debug Mode
The app runs in debug mode by default. Check console output for detailed error messages.

## 📈 Next Steps

1. **Production Deployment**: Deploy to cloud platform (Heroku, AWS, etc.)
2. **Calendar Integration**: Implement full Google Calendar booking
3. **Payment Integration**: Add Stripe for deposit payments
4. **Analytics**: Add conversation analytics and reporting
5. **Multi-language**: Expand beyond French/English

## 📝 Development Notes

- Flask app runs on port 5000
- ngrok provides public HTTPS URL for Twilio webhooks
- All conversation data is stored in Supabase
- AI responses are generated using GPT-4o
- Language detection is automatic (French/English)

## 🔒 Security Notes

- Never commit `.env` file to Git
- Keep API keys secure
- Use HTTPS in production
- Monitor API usage and costs

---

**Last Updated**: July 30, 2025
**Version**: 1.0.0
**Status**: Development/Testing 