const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
exports.login = async (req,res) => {
  try{
    const validUser = await User.findOne({where: {email: req.body.email}});
    if(!validUser) {
      return res.status(401).json({
        message: 'invalid email or password'
      })
    }
    const validPass = await bcrypt.compare(req.body.password, validUser.password);
    if(!validPass) {
      return res.status(401).json({
        message: 'invalid email or password'
      })
    }
    const token = jwt.sign({id: validUser.userId, email: validUser.email, password: validUser.password}, process.env.JWT_SECRET);
    console.log(token)
    return res.status(201).json({
      user: validUser,
      token
    });
  }catch(err) {
    res.status(500).json(err);
  }
}