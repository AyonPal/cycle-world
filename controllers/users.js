const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET;
module.exports = {
  async login(req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({where: {username}});
      if(!user){
        return res.status(401).json({error: "User/Password not matched"})
      }
      let checkPass = bcrypt.compareSync(password, user.password)
      if (!checkPass){
        return res.status(401).json({error: "User/Password not matched"})
      }
      const token = jwt.sign({username: user.username}, secretKey, {expiresIn: '1d'})
      return res.status(200).json({success: true, token: `Bearer ${token}`});
    } catch (error) {
      return res.status(400).json({ error: 'Internal Error' });
    }
  },
  async register(req, res) {
    try {
      const {username, password} = req.body
      if(!(username.length > 0)){
        return res.status(401).json({error: "Username Empty"})
      }
      if(!(password.length > 4)){
        return res.status(401).json({error: "Password Must be length of 8"})
      }
      const user = await User.findOne({where: {username}});
      if(user){
        return res.status(401).json({error: "User already Registered"})
      }
      let pwhash = bcrypt.hashSync(password, 10)
      const newUser = await User.create({ username, password: pwhash });
      const token = jwt.sign({username: newUser.username}, secretKey, {expiresIn: '1d'})
      return res.status(200).json({success: true, token: `Bearer ${token}`});
    } catch (error) {
      return res.status(400).json({ error: 'Internal Error' });
    }
  },
};
