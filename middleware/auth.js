const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function checkAuth(req, res, next) {
  const header = req.header('Authorization');

  if (!header) {
    return res.status(401).json({ message: 'Authorization Header missing' });
  }
  try {
    const token = header.split(" ")[1]

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }catch(err){
    console.log(err)
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {checkAuth};