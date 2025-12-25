const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Admin = require('./models/admin');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/imc_complaints', {
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log('✓ Connected to MongoDB');
    createTestData();
}).catch((e) => {
    console.error('✗ MongoDB Connection failed:', e.message);
    process.exit(1);
});

async function createTestData() {
    try {
        // Create test user
        const userExists = await User.findOne({ email: 'testuser@gmail.com' });
        if (!userExists) {
            const hashedUserPassword = await bcrypt.hash('user', 12);
            await User.create({
                username: 'testuser',
                employeeID: 'USER001',
                email: 'testuser@gmail.com',
                password: hashedUserPassword
            });
            console.log('✓ Test user created: testuser@gmail.com / user');
        } else {
            console.log('ℹ Test user already exists');
        }

        // Create test admin
        const adminExists = await Admin.findOne({ email: 'testadmin@gmail.com' });
        if (!adminExists) {
            const hashedAdminPassword = await bcrypt.hash('admin', 12);
            await Admin.create({
                username: 'testadmin',
                employeeID: 'ADMIN001',
                email: 'testadmin@gmail.com',
                password: hashedAdminPassword
            });
            console.log('✓ Test admin created: testadmin@gmail.com / admin');
        } else {
            console.log('ℹ Test admin already exists');
        }

        console.log('\n✅ Test data setup complete!');
        console.log('\nTest Credentials:');
        console.log('=====================================');
        console.log('USER LOGIN:');
        console.log('  Username: testuser');
        console.log('  Employee ID: USER001');
        console.log('  Email: testuser@gmail.com');
        console.log('  Password: user');
        console.log('');
        console.log('ADMIN LOGIN:');
        console.log('  Username: testadmin');
        console.log('  Employee ID: ADMIN001');
        console.log('  Email: testadmin@gmail.com');
        console.log('  Password: admin');
        console.log('=====================================\n');

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error creating test data:', error);
        mongoose.connection.close();
        process.exit(1);
    }
}
