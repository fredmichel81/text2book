# BookingBuddy - Complete SMS Booking Solution

## 🎯 Project Overview

BookingBuddy is a comprehensive solution for small businesses to handle customer bookings via SMS. It consists of two main components:

1. **Landing Page** - Marketing website with waitlist signup ([https://bookingbuddy.vercel.app/](https://bookingbuddy.vercel.app/))
2. **BookingBuddy Backend** - AI-powered SMS assistant backend

## 📁 Repository Structure

```
BookingBuddy/
├── LandingPage/          # Next.js landing page
│   ├── src/             # React components
│   ├── public/          # Static assets
│   └── package.json     # Next.js dependencies
├── App/                 # Flask backend (BookingBuddy Backend)
│   ├── app.py          # Main Flask application
│   ├── requirements.txt # Python dependencies
│   ├── test_app.py     # Test suite
│   └── venv/           # Python virtual environment
└── docs/               # Project documentation
    ├── PROJECT_SETUP.md
    ├── AUTOREPONDEUR_PRO_SUMMARY.md
    └── REPOSITORY_MAPPING.md
```

## 🚀 Quick Start

### Landing Page (Next.js)
```bash
cd LandingPage
npm install
npm run dev
```
Visit: http://localhost:3000

### Backend App (Flask)
```bash
cd App
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
Visit: http://localhost:5000

## 🔧 Technologies Used

### Landing Page
- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel

### Backend App
- **Framework**: Flask 3.0.3
- **Language**: Python 3.13
- **AI**: OpenAI GPT-4o
- **SMS**: Twilio
- **Database**: Supabase
- **Calendar**: Google Calendar API

## 📊 Features

### Landing Page Features
- ✅ Animated SMS conversation previews
- ✅ Bilingual support (English/French)
- ✅ Feature highlights with icons
- ✅ Embedded Google Form waitlist
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

### Backend App Features
- ✅ AI-powered SMS responses
- ✅ Automatic language detection
- ✅ Customer information extraction
- ✅ Conversation logging
- ✅ Calendar integration
- ✅ Comprehensive testing

## 📖 Documentation

- **[Project Setup Guide](docs/PROJECT_SETUP.md)** - Complete setup instructions
- **[BookingBuddy Backend Summary](docs/BOOKINGBUDDY_BACKEND_SUMMARY.md)** - Backend overview
- **[Repository Mapping](docs/REPOSITORY_MAPPING.md)** - Detailed structure

## 🌐 Live Demo

- **Landing Page**: [https://bookingbuddy.vercel.app/](https://bookingbuddy.vercel.app/)
- **Backend**: Development/Testing phase

## 🔗 External Services

- **OpenAI**: GPT-4o for AI responses
- **Twilio**: SMS handling
- **Supabase**: Database storage
- **Google Calendar**: Appointment management
- **Vercel**: Landing page hosting

## 📝 Development

### Prerequisites
- Node.js 18+ (for Landing Page)
- Python 3.13+ (for Backend)
- Git

### Environment Setup
1. Copy `App/env_template.txt` to `App/.env`
2. Fill in your API keys
3. Set up Supabase database
4. Configure Twilio webhook

## 🚀 Deployment

### Landing Page
- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output**: Static files

### Backend App
- **Platform**: Heroku, AWS, Google Cloud
- **Requirements**: Python 3.13, Flask, external APIs
- **Environment**: `.env` file with API keys

## 📈 Project Status

- **Landing Page**: ✅ Production ready
- **Backend App**: 🔄 Development/Testing
- **Documentation**: ✅ Complete
- **Testing**: ✅ Comprehensive

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and development purposes.

---

**Repository**: https://github.com/fredmichel81/bookingbuddy  
**Last Updated**: July 30, 2025  
**Version**: 1.0.0 