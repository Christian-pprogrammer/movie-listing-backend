const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.registerUser = async (req,res) => {
  try{
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: password
    });
    const token = jwt.sign({id: user.userId, email: user.email, password: user.password}, process.env.JWT_SECRET);
    return res.status(201).json({
      user,
      token
    });
  }catch(err) {
    res.status(500).json(err);
  }
}