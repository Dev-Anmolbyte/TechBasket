const users = require("../users.js");
const sendEmail = require("../utils/sendEmail.js");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const resetToken = `reset-token-${Date.now()}`; // In real use: JWT or UUID
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
      <h3>Hello ${user.name},</h3>
      <p>You requested to reset your password. Click below:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail(user.email, "Reset your password", message);
    return res.status(200).json({ message: "Reset link sent successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
};
