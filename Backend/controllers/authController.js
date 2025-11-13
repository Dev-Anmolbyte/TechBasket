const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
const CLIENT_URL = "http://localhost:5173"; // frontend link

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `${CLIENT_URL}/reset-password/${token}`;

    // You can use a real SMTP email provider here
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password", // use app password if 2FA
      },
    });

    const mailOptions = {
      from: "noreply@techbasket.com",
      to: user.email,
      subject: "Password Reset Link",
      html: `
        <p>You requested a password reset</p>
        <p>Click this link to reset your password (valid for 15 mins):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = password;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
