# BookingBuddy Repository - Complete Mapping

## 📍 Repository Information

- **Repository URL**: https://github.com/fredmichel81/bookingbuddy
- **Remote Origin**: https://github.com/fredmichel81/bookingbuddy.git
- **Current Location**: `/home/fme-inc/Documents/Project/AR_Cursor/bookingbuddy-pro-landing`

## 🌿 Branch Structure

```
bookingbuddy/
├── main (origin/main)                    # BookingBuddy Landing Page
└── backend (origin/backend)              # BookingBuddy Backend
```

## 📊 Commit History

```
* 0644581 (HEAD -> autorepondeur-pro, origin/autorepondeur-pro) Add project summary document
* 4bb87c9 Add BookingBuddy Backend - AI-powered SMS assistant for small businesses
* 1f3a004 (origin/main, main) Fix: prevent payment link overflow in SMS chat bubbles on mobile
* c902a2a Polish: hero headline, anchor CTA, wider form, remove final CTA
* 236613d Embed Google Form waitlist and update CTA link
* d82aafe Fix: use real apostrophe in French chat message
* 0365621 Add lucide-react dependency and feature section with icons
* 0a4600c Add Lucide icons, animated chat, feature section, and final CTA
* c25fb97 Fix: remove unused Image import and escape single quote in French message
* eb84823 Initial commit for Txt2Book landing page
```

## 📁 Branch: `main` - Txt2Book Landing Page

### Project Type
- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Purpose**: Landing page for Txt2Book waitlist

### File Structure
```
main/
├── .gitignore                          # Git ignore rules
├── .next/                              # Next.js build output
├── node_modules/                       # Node.js dependencies
├── public/                             # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                                # Source code
│   └── app/                            # Next.js App Router
│       ├── favicon.ico                 # Site favicon
│       ├── globals.css                 # Global styles
│       ├── layout.tsx                  # Root layout
│       └── page.tsx                    # Home page (199 lines)
├── eslint.config.mjs                   # ESLint configuration
├── next.config.ts                      # Next.js configuration
├── next-env.d.ts                       # Next.js TypeScript definitions
├── package.json                        # Node.js dependencies
├── package-lock.json                   # Locked dependencies
├── postcss.config.mjs                  # PostCSS configuration
├── README.md                           # Project documentation
└── tsconfig.json                       # TypeScript configuration
```

### Key Features (main branch)
- **Animated SMS Conversations**: English and French chat previews
- **Feature Highlights**: AI-powered replies, calendar sync, payment protection, bilingual support
- **Waitlist Form**: Embedded Google Form for signups
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with Lucide icons

## 📁 Branch: `backend` - BookingBuddy Backend

### Project Type
- **Framework**: Flask 3.0.3
- **Language**: Python 3.13
- **Purpose**: AI-powered SMS assistant for small businesses

### File Structure
```
autorepondeur-pro/
├── .gitignore                          # Git ignore rules
├── .next/                              # Next.js build output (inherited)
├── node_modules/                       # Node.js dependencies (inherited)
├── public/                             # Static assets (inherited)
├── src/                                # Source code (inherited)
├── venv/                               # Python virtual environment
├── app.py                              # Main Flask application (9,131 bytes)
├── AUTOREPONDEUR_PRO_SUMMARY.md        # Project summary (3,954 bytes)
├── calendar_test.py                    # Google Calendar test (1,431 bytes)
├── env_template.txt                    # Environment variables template
├── google-calendar-credentials.json    # Google Calendar credentials
├── index.html                          # Simple web interface (3,533 bytes)
├── PROJECT_SETUP.md                    # Comprehensive setup guide (7,104 bytes)
├── README.md                           # Updated documentation (6,899 bytes)
├── requirements.txt                    # Python dependencies (217 bytes)
├── test_app.py                         # Test script (4,205 bytes)
├── eslint.config.mjs                   # ESLint configuration (inherited)
├── next.config.ts                      # Next.js configuration (inherited)
├── next-env.d.ts                       # Next.js TypeScript definitions (inherited)
├── package.json                        # Node.js dependencies (inherited)
├── package-lock.json                   # Locked dependencies (inherited)
├── postcss.config.mjs                  # PostCSS configuration (inherited)
└── tsconfig.json                       # TypeScript configuration (inherited)
```

### Key Features (backend branch)
- **SMS Webhook**: Twilio integration for incoming messages
- **AI Processing**: OpenAI GPT-4o for language detection and responses
- **Database Integration**: Supabase for conversation logging
- **Customer Management**: Automatic customer creation and tracking
- **Bilingual Support**: French/English language detection
- **Calendar Integration**: Google Calendar booking (stub)
- **Testing Framework**: Comprehensive test suite
- **Documentation**: Complete setup and usage guides

## 🔄 Branch Comparison

| Feature | main | backend |
|---------|------|-------------------|
| **Project Type** | Frontend Landing Page | Backend API |
| **Framework** | Next.js | Flask |
| **Language** | TypeScript | Python |
| **Purpose** | Marketing/Waitlist | SMS Assistant |
| **Deployment** | Vercel/Static | Server/Cloud |
| **Dependencies** | Node.js | Python |
| **Database** | None | Supabase |

## 📊 File Size Analysis

### Main Branch
- **Total Files**: ~15 files
- **Largest Files**: 
  - `package-lock.json`: 204KB
  - `src/app/page.tsx`: 9.2KB
  - `node_modules/`: ~12MB

### BookingBuddy Backend Branch
- **Total Files**: ~25 files (includes inherited files)
- **Largest Files**:
  - `app.py`: 9.1KB
  - `PROJECT_SETUP.md`: 7.1KB
  - `README.md`: 6.9KB
  - `test_app.py`: 4.2KB

## 🚀 Deployment Considerations

### Main Branch (Landing Page)
- **Platform**: Vercel, Netlify, or any static hosting
- **Build Command**: `npm run build`
- **Output**: Static files in `.next/` directory

### BookingBuddy Backend Branch (Backend)
- **Platform**: Heroku, AWS, Google Cloud, or any Python hosting
- **Requirements**: Python 3.13, Flask, external APIs
- **Environment**: Need `.env` file with API keys

## 📝 Development Workflow

### Working on Landing Page
```bash
git checkout main
npm install
npm run dev
```

### Working on Backend
```bash
git checkout backend
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

## 🔗 Repository URLs

- **Main Repository**: https://github.com/fredmichel81/bookingbuddy
- **Main Branch**: https://github.com/fredmichel81/bookingbuddy/tree/main
- **Backend Branch**: https://github.com/fredmichel81/bookingbuddy/tree/backend
- **Pull Request**: https://github.com/fredmichel81/bookingbuddy/pull/new/backend

---

**Last Updated**: July 30, 2025  
**Repository Status**: Active Development  
**Branches**: 2 (main + backend)  
**Total Commits**: 10 