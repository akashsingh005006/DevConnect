const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success:true,
            user,
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

const loginUser =  async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            });
        }
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.status(200).json({
  success: true,
  token,
  userId: user._id,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports={
    registerUser,
    loginUser,
};