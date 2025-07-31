
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const creg= new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 }
});

// Virtual (not stored!) for confirm password
creg.virtual('cpassword')
  .get(function() { return this._cpassword; })
  .set(function(val) { this._cpassword = val; });

// Validate match
creg.pre('validate', function(next) {
  if (this.isNew || this.isModified('password')) {
    if (this.password !== this._cpassword) {
      this.invalidate('cpassword', 'Passwords do not match');
    }
  }
  next();
});

// Hash password
creg.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('customer_register', creg);
