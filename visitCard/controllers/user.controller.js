const User = require('../models/models');
module.exports.home = async (req, res) => {
      const user = await User.findById(req.userId);
      res.render('account',
                 {
                    title: 'Account',
                     user: user,
                     userName: user.name,
                 }
                );
   }