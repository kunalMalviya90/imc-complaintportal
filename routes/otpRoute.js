const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const OTP = require('../models/otp');
const otpGenerator = require('otp-generator');
const { sendOTPEmail } = require('../utils/emailService');

//send users otp
router.post('/send-user-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(500).json({
      success: false,
      msg: "Email is required",
    });
  }

  const checkUserPresent = await User.findOne({ email });
  if (!checkUserPresent) {
    return res.status(200).json({
      success: false,
      msg: "User not found"
    });
  }

  // Generate 4-digit OTP
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true
  });

  const expireAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Save OTP in database
  await OTP.create({ email, otp, expireAt });

  // Send OTP via email
  const emailResult = await sendOTPEmail(email, otp, 'User');

  if (emailResult.success) {
    console.log("OTP sent successfully to:", email);
    return res.status(200).json({
      success: true,
      msg: "OTP sent successfully to your email"
    });
  } else {
    return res.status(500).json({
      success: false,
      msg: "Failed to send OTP email"
    });
  }
});

//send admins otp
router.post('/send-admin-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(500).json({
      success: false,
      msg: "Email is required",
    });
  }

  const checkAdminPresent = await Admin.findOne({ email });
  if (!checkAdminPresent) {
    return res.status(200).json({
      success: false,
      msg: "Admin not found"
    });
  }

  // Generate 4-digit OTP
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true
  });

  const expireAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Save OTP in database
  await OTP.create({ email, otp, expireAt });

  // Send OTP via email
  const emailResult = await sendOTPEmail(email, otp, 'Admin');

  if (emailResult.success) {
    console.log("OTP sent successfully to:", email);
    return res.status(200).json({
      success: true,
      msg: "OTP sent successfully to your email"
    });
  } else {
    return res.status(500).json({
      success: false,
      msg: "Failed to send OTP email"
    });
  }
});

// Verify User OTP
router.post('/verify-user-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the most recent OTP for this email
    const otpRecord = await OTP.findOne({ email }).sort({ expireAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        msg: "OTP not found or expired"
      });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expireAt) {
      return res.status(400).json({
        success: false,
        msg: "OTP has expired"
      });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        msg: "Invalid OTP"
      });
    }

    // OTP is valid - delete it
    await OTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully"
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
});

// Verify Admin OTP
router.post('/verify-admin-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the most recent OTP for this email
    const otpRecord = await OTP.findOne({ email }).sort({ expireAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        msg: "OTP not found or expired"
      });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expireAt) {
      return res.status(400).json({
        success: false,
        msg: "OTP has expired"
      });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        msg: "Invalid OTP"
      });
    }

    // OTP is valid - delete it
    await OTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully"
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
});

module.exports = router;
