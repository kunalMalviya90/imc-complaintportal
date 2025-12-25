# IMC Complaint Portal - Local Setup Guide

This guide will help you set up and run the IMC Complaint Portal on your local machine.

## Prerequisites

✅ **MongoDB** - Already installed and running as a service
✅ **Node.js** - Already installed (v25.2.1)
✅ **npm** - Package manager

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Seed the Database

Run this command to create initial admin and user accounts:

```bash
node seedDatabase.js
```

This will create:
- **Admin Account**: admin@imc.gov.in / Admin@123
- **User Account**: user@imc.gov.in / User@123
- Additional test users

### 3. Start the Application

```bash
npm start
```

The server will start on `http://localhost:5000`

## Using the Application

### Homepage
Visit: `http://localhost:5000`

### Login Page
Visit: `http://localhost:5000/userlogin`

### Login Flow

1. **Enter credentials** (use the test accounts created by seedDatabase.js)
2. **Click "Send OTP"** - The OTP will be displayed in the console where the server is running
3. **Copy the 6-digit OTP** from the console
4. **Enter OTP** in the login form
5. **Click "Login"**

### Development Mode Features

- **Console OTP**: OTPs are displayed in the server console instead of being emailed
- **Local Database**: All data is stored in local MongoDB database `imc_complaints`
- **Fast Testing**: No need to configure email credentials

## Test Accounts

### User Login
```
Email: user@imc.gov.in
Password: User@123
Employee ID: EMP001
```

### Admin Login
```
Email: admin@imc.gov.in
Password: Admin@123
Employee ID: ADM001
```

### Additional Users
```
Email: rajesh.kumar@imc.gov.in
Password: Test@123

Email: priya.sharma@imc.gov.in
Password: Test@123
```

## Troubleshooting

### MongoDB Connection Issues

If you see "Connection failed" error:

1. Check if MongoDB service is running:
```powershell
Get-Service -Name MongoDB
```

2. If not running, start it:
```powershell
Start-Service MongoDB
```

### Port Already in Use

If port 5000 is already in use, you can change it by setting the PORT environment variable:

```powershell
$env:PORT=3000
npm start
```

### Clear Database and Reseed

To clear all data and reseed:

```bash
node seedDatabase.js
```

This will delete all existing users, admins, and complaints, then create fresh test accounts.

## Application Features

### For Users
- File complaints with attachments
- View complaint status
- Track complaint history
- Download complaint reports

### For Admins
- View all complaints
- Update complaint status
- Manage users
- Download reports (Excel format)
- Filter complaints by department, date, status

## Project Structure

```
IMC-complaint-portal/
├── app.js              # Main application file
├── models/            # Database models
│   ├── user.js
│   ├── admin.js
│   ├── otp.js
│   └── complaint.js
├── routes/            # Route handlers
│   ├── index.js       # Main routes
│   ├── otpRoute.js    # OTP routes
│   └── render.js      # Page rendering routes
├── views/             # EJS templates
├── public/            # Static files (CSS, JS, images)
├── utils/             # Utility functions
│   └── mailSender.js  # Email/OTP handler
└── uploads/           # File uploads directory
```

## Production Deployment

To use real email for OTP in production:

1. Create a `.env` file with:
```
NODE_ENV=production
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-app-specific-password
MONGODB_URI=your-production-mongodb-uri
PORT=5000
```

2. Get Gmail app-specific password:
   - Go to Google Account settings
   - Security → 2-Step Verification
   - App passwords → Generate new password
   - Copy and use in `.env` file

## Support

For issues or questions, check the console logs for detailed error messages.
