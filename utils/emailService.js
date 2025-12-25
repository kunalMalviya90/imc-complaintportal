const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'malviyakunal2004@gmail.com',
        pass: 'yjgvugwmzsfzbsbq' // App password without spaces
    }
});

// Function to send OTP via email
async function sendOTPEmail(email, otp, userType = 'User') {
    const mailOptions = {
        from: 'malviyakunal2004@gmail.com',
        to: email,
        subject: 'Your IMC Login OTP',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
                    .otp { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 10px; }
                    .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
                    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔐 IMC Complaint Portal</h1>
                    </div>
                    <div class="content">
                        <h2>Dear ${userType},</h2>
                        <p>Your One-Time Password (OTP) for login is:</p>
                        
                        <div class="otp-box">
                            <div class="otp">${otp}</div>
                        </div>
                        
                        <div class="warning">
                            ⚠️ <strong>Important:</strong> This OTP is valid for <strong>5 minutes</strong> only.
                        </div>
                        
                        <p>Please do not share this OTP with anyone for security reasons.</p>
                        
                        <p>If you did not request this OTP, please ignore this email.</p>
                        
                        <p>Regards,<br><strong>IMC Complaint Portal Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2024 Indore Municipal Corporation. All rights reserved.</p>
                        <p>This is an automated email. Please do not reply.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

module.exports = { sendOTPEmail };
