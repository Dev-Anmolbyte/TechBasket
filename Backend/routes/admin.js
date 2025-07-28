
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_Secret = "f8d3c7c716f947af8a3e0e4e6e2ba3f8b9c5a2f0e4c61a8d6fa4b5c7a82b0d3f"

const bcrypt = require('bcryptjs');


const areg = require('../Model/admin/a_register');
const alog = require('../Model/admin/a_login');


/* GET admin listing */
router.get('/admin', (req, res) => {
  res.send('respond from admin');
});
// ==================================================================================================================
// admin register 
router.post('/register', async (req, res) => {
  try {
    const { fname, lname, email, phone, password, cpassword } = req.body;

    const existingUser = await areg.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new areg({ fname, lname, email, phone, password });

    user.cpassword = cpassword;

    await user.save();

    return res.status(201).json({ user });
  } catch (error) {

    if (error.errors && error.errors.cpassword) {
      return res.status(400).json({ message: error.errors.cpassword.message });
    }
    return res.status(500).json({ error: error.message });
  }
});
// ================================================================================================================

//admin login
router.post("/login", async (req, res) => {
  try {
    const user = await areg.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Account doesn't exist" });
    }

    // Password check
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_Secret, { expiresIn: "7d" });
    res.status(200).json({ messsage: "Login Successfuly", token, success: true });
  }
  catch (error) {
    res.status(500).json({ error: error.message, success: false })
  }
});

module.exports = router;
