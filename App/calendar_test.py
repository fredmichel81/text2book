import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Load env vars
load_dotenv()
CALENDAR_ID = os.getenv("CALENDAR_ID")
SERVICE_ACCOUNT_FILE = "google-calendar-credentials.json"
SCOPES = ['https://www.googleapis.com/auth/calendar']

# Auth setup
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('calendar', 'v3', credentials=credentials)

# Print upcoming 3 days
today = datetime.now()
print("🔍 Checking your schedule:")

for i in range(3):
    day = today + timedelta(days=i)
    start = day.replace(hour=9, minute=0, second=0, microsecond=0)
    end = day.replace(hour=17, minute=0, second=0, microsecond=0)

    print(f"\n📅 {day.strftime('%A, %B %d')}:")

    events_result = service.events().list(
        calendarId=CALENDAR_ID,
        timeMin=start.isoformat() + "-04:00",
        timeMax=end.isoformat() + "-04:00",
        singleEvents=True,
        orderBy='startTime'
    ).execute()

    events = events_result.get('items', [])
    if not events:
        print("  ✅ Free all day.")
    else:
        for event in events:
            summary = event.get("summary", "No title")
            start_time = event["start"].get("dateTime", event["start"].get("date"))
            print(f"  🔒 {start_time} — {summary}")
