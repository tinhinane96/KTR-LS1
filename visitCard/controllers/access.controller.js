const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const registerForm = (_,res) => res.redirect('/register.html');

const register = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const userData = {
                        ...req.body,
                        password: hashPassword  
                     };
    const newUser= await User.create(userData); 
    delete userData.password;                    
    console.log('utilisateur créé');
    res.status(201).json(userData);
  }
  catch (err){
    console.log(`pb création utilisateur ${err.message}`);
    res.status(409).json({ message : err.message });
  }
}

const loginForm = (_,res) => res.redirect('/welcome.html');

const login = async (req, res) => {
  console.log(`login : ${req.body.login}`);
  try {
    const user = await User.findOne( { login : req.body.login });
    console.log(`login : ${req.body.login}`);
    if (user) {
      // check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) // wrong password
        return res.status(401).json({ message : 'mot de passe incorrect.'});

      // create and send token
      const token = jwt.sign({id: user._id}, jwtConfig.SECRET_TOKEN, {expiresIn : '555555s'} );
      console.log(`login : ${token}`);
      res.cookie('token', token,  { maxAge : 60000, httpOnly: true, sameSite : 'strict' })  // secure : true (avec https)
      res.status(200).json({ message : 'utilisateur connecté' });
    }
    else { // unknown login
      console.log(`User ${req.body.login} inconnu`);
      res.status(401).json({ message : `utilisateur ${req.body.login} inconnu`});
    }
  }
  catch (err) {
    console.log(`pb connexion ${err.message}`);
    res.status(500).redirect('/access/register');
  }
}

const logout = (req,res) => {
  res.cookie('token', '',  { maxAge : 2000, httpOnly: true, sameSite : 'strict' }) // secure : true
  res.status(200).json({ message : 'utilisateur déconnecté' });
}

module.exports.login = login;
module.exports.loginForm = loginForm;
module.exports.register = register;
module.exports.registerForm = registerForm;
module.exports.logout = logout;
