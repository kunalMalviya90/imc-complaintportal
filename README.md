# IMC Complaint Portal 🏛️

Employee complaint management system for Indore Municipal Corporation.

## Features ✨

- **User Portal**
  - Register and login
  - File complaints with attachments
  - Track complaint status
  - View complaint history
  - Dark mode support

- **Admin Portal**
  - View all complaints
  - Manage users
  - Update complaint status
  - Download reports (Excel)
  - Analytics dashboard

## Tech Stack 🛠️

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: EJS, Vanilla CSS/JS
- **Authentication**: bcrypt, express-session
- **File Upload**: Multer

## Installation 📦

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI

# Run the application
npm start
```

## Environment Variables

```env
MONGODB_URI=mongodb://127.0.0.1:27017/imc_complaints
PORT=3000
SESSION_SECRET=your-secret-key
```

## Test Credentials 🔑

### User Login
- Username: `testuser`
- Employee ID: `USER001`
- Email: `testuser@gmail.com`
- Password: `user`

### Admin Login
- Username: `testadmin`
- Employee ID: `ADMIN001`
- Email: `testadmin@gmail.com`
- Password: `admin`

## Deployment 🚀

See [deployment_guide.md](deployment_guide.md) for complete deployment instructions.

**Recommended**: Render.com + MongoDB Atlas (Free)

## License

MIT

## Contact

Indore Municipal Corporation
