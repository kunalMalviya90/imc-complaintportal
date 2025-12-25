// seedDatabase.js - Script to seed initial data for IMC Complaint Portal
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import models
const User = require('./models/user');
const Admin = require('./models/admin');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/imc_complaints";

async function seedDatabase() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✓ Connected to MongoDB\n');

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Admin.deleteMany({});
        console.log('✓ Cleared existing users and admins\n');

        // Create demo users from provided data
        console.log('Creating demo user accounts...');
        const users = [
            { username: 'piyushmadhukar', employeeID: '1234', email: 'piyushmadhukar12345@gmail.com', password: 'piyush' },
            { username: 'rohitsharma', employeeID: '1235', email: 'rohitsharma234@gmail.com', password: 'rohit' },
            { username: 'amitverma', employeeID: '1236', email: 'amitverma678@gmail.com', password: 'amit' },
            { username: 'sachinpatel', employeeID: '1237', email: 'sachinpatel901@gmail.com', password: 'sachin' },
            { username: 'ankitgupta', employeeID: '1238', email: 'ankitgupta456@gmail.com', password: 'ankit' }
        ];

        for (const userData of users) {
            const hashedPassword = await bcrypt.hash(userData.password, 12);
            await User.create({
                username: userData.username,
                employeeID: userData.employeeID,
                email: userData.email,
                password: hashedPassword
            });
        }
        console.log('✓ Created 5 user accounts\n');

        // Create demo admins from provided data
        console.log('Creating demo admin accounts...');
        const admins = [
            { username: 'kunalmalviya', employeeID: '5678', email: 'malviyakunal90@gmail.com', password: 'kunal' },
            { username: 'rahuljoshi', employeeID: '5679', email: 'rahuljoshi.admin@gmail.com', password: 'rahul' },
            { username: 'deepaksingh', employeeID: '5680', email: 'deepaksingh.admin@gmail.com', password: 'deepak' },
            { username: 'manojyadav', employeeID: '5681', email: 'manojyadav.admin@gmail.com', password: 'manoj' },
            { username: 'vikaskumar', employeeID: '5682', email: 'vikaskumar.admin@gmail.com', password: 'vikas' }
        ];

        for (const adminData of admins) {
            const hashedPassword = await bcrypt.hash(adminData.password, 12);
            await Admin.create({
                username: adminData.username,
                employeeID: adminData.employeeID,
                email: adminData.email,
                password: hashedPassword
            });
        }
        console.log('✓ Created 5 admin accounts\n');

        console.log('═══════════════════════════════════════════');
        console.log('✓ Database seeded successfully!');
        console.log('═══════════════════════════════════════════');
        console.log('\n📋 DEMO USER ACCOUNTS (5 Users):');
        console.log('─────────────────────────────────────────');
        users.forEach(user => {
            console.log(`👤 ${user.username}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Employee ID: ${user.employeeID}`);
            console.log(`   Password: ${user.password}\n`);
        });

        console.log('� DEMO ADMIN ACCOUNTS (5 Admins):');
        console.log('─────────────────────────────────────────');
        admins.forEach(admin => {
            console.log(`👨‍💼 ${admin.username}`);
            console.log(`   Email: ${admin.email}`);
            console.log(`   Employee ID: ${admin.employeeID}`);
            console.log(`   Password: ${admin.password}\n`);
        });

        console.log('═══════════════════════════════════════════');
        console.log('✓ Login now works WITHOUT OTP!');
        console.log('  Just enter username, employee ID, email, and password');
        console.log('═══════════════════════════════════════════\n');

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);

    } catch (error) {
        console.error('✗ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
