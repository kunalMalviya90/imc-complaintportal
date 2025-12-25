// app.js
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Middleware for logout 
app.use(session({
    secret: 'cheshta31',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false
    }
}));


// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connection to mongodb - using local MongoDB for development
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/imc_complaints";

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
}).then(() => {
    console.log('✓ Connected to MongoDB successfully');
    console.log('Database:', MONGODB_URI);
}).catch((e) => {
    console.error('✗ MongoDB Connection failed:', e.message);
    console.error('Make sure MongoDB service is running');
    process.exit(1); // Exit if database connection fails
}) 

// Define routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const renderRouter = require('./routes/render');
app.use('/', renderRouter);

const otpRouter = require('./routes/otpRoute');
app.use('/', otpRouter);

//const multerRouter = require('./routes/multerConfig');
//app.use('/', multerRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;