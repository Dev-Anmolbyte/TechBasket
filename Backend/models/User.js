const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    // For forgot password
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Example login function
const login = async (email, password) => {
  const res = await axios.post('/api/auth/login', { email, password });
  // The backend should return the user object and a token
  const { user, token } = res.data;
  // Store the token in the user object
  setUser({ ...user, token });
  localStorage.setItem('user', JSON.stringify({ ...user, token }));
};

module.exports = mongoose.model("User", userSchema);
