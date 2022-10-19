const jwt = require('jsonwebtoken');
module.exports.authenticated = (req,res,next) => {
  try{
    let token = req.headers.Authorization || req.headers.token || req.headers.authorization;
    if(!token) {
      return res.status(401).json({
        message: 'You are not authorized'
      }) 
    }
    if(token && token.startsWith('Bearer')) {
      console.log(token)
      token = token.split(' ')[1];
    }
    try{
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      req.user = user;
      next();
    }catch(err) {
      return res.status(401).json({
        message: 'You are not authorized'
      })
    }
    
  }catch(err) {
    return res.status(500).json(err);
  }
}