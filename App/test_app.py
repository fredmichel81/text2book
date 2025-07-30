#!/usr/bin/env python3
"""
Test script for BookingBuddy Backend
This script helps test the application functionality without needing Twilio webhooks.
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_URL = "http://localhost:5000"

def test_health():
    """Test the health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed!")
            print(f"   Status: {data['status']}")
            print(f"   Services: {data['services']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure the Flask app is running.")
        return False

def test_sms_endpoint(message, from_number="+1234567890"):
    """Test the SMS endpoint with a mock message"""
    print(f"\n📱 Testing SMS endpoint with message: '{message}'")
    try:
        data = {
            'Body': message,
            'From': from_number
        }
        response = requests.post(f"{BASE_URL}/sms", data=data)
        if response.status_code == 200:
            print("✅ SMS endpoint responded successfully!")
            print(f"   Response: {response.text}")
            return True
        else:
            print(f"❌ SMS endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure the Flask app is running.")
        return False

def test_environment():
    """Test if environment variables are set"""
    print("🔧 Checking environment variables...")
    required_vars = [
        'OPENAI_API_KEY',
        'SUPABASE_URL', 
        'SUPABASE_KEY'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        print("   Please check your .env file")
        return False
    else:
        print("✅ All required environment variables are set")
        return True

def run_test_conversation():
    """Run a test conversation flow"""
    print("\n💬 Running test conversation...")
    
    test_messages = [
        "Hello, I'd like to book a haircut",
        "My name is John",
        "Can I get an appointment for Friday at 2 PM?",
        "Thank you!"
    ]
    
    for i, message in enumerate(test_messages, 1):
        print(f"\n--- Message {i} ---")
        success = test_sms_endpoint(message)
        if not success:
            print("❌ Test conversation failed")
            return False
    
    print("\n✅ Test conversation completed successfully!")
    return True

def main():
    """Main test function"""
    print("🚀 BookingBuddy Backend Test Suite")
    print("=" * 40)
    
    # Test environment
    if not test_environment():
        print("\n❌ Environment test failed. Please fix the issues above.")
        return
    
    # Test health endpoint
    if not test_health():
        print("\n❌ Health test failed. Please start the Flask app first.")
        return
    
    # Test individual SMS messages
    print("\n" + "=" * 40)
    print("Testing individual messages...")
    
    test_cases = [
        ("Hello", "Basic greeting"),
        ("Bonjour, je voudrais prendre rendez-vous", "French booking request"),
        ("My name is Sarah and I need a haircut", "English with name"),
        ("Quel est votre horaire?", "French question about hours")
    ]
    
    for message, description in test_cases:
        print(f"\n--- {description} ---")
        test_sms_endpoint(message)
    
    # Run full conversation test
    print("\n" + "=" * 40)
    print("Running full conversation test...")
    run_test_conversation()
    
    print("\n🎉 All tests completed!")

if __name__ == "__main__":
    main() 