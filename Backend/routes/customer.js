var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
const JWT_Secret="a3d94fbe9837b2256e0c7eaeb512fc937dd2a6d4d2cc5ff748bbcd82d9f97e71"

const bcrypt = require('bcryptjs');

var creg=require("../Model/customer/c_register")
const clog= require('../Model/customer/c_login');

//for fogot password
const users = [
  { id: 1, name: "Anmol", email: "anmol@example.com" },
];
//code end of forgot password

/* GET customer listing. */
router.get('/customer', function(req, res, next) {
  res.send('respond from customer');
});
// =================================================================================================================
//customer Register

router.post('/register', async (req, res) => {
  try {
    const { fname, lname, email, phone, password, cpassword } = req.body;

    const existingUser = await creg.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new creg({ fname, lname, email, phone, password });
  
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

// =================================================================================================================
//customer login
router.post("/login", async(req, res)=>
{
  try{
    const user=await creg.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({message:"Account doesn't exist"});
    }

    // Password check
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }

    const token=jwt.sign({_id:user._id,email:user.email},JWT_Secret,{expiresIn:"7d"});
    res.status(200).json({messsage:"Login Successfuly",token,success:true});
  }
  catch(error){
    res.status(500).json({error:error.message,success:false})
  }
});



module.exports = users;



module.exports = router;