const Card = require('../models/card.model');
const User = require('../models/user.model');
module.exports.home = async (req, res) => {
      const user = await User.findById(req.userId);
      const cards = await Card.find({userId: req.userId});
      
      res.render('account',
                 {
                    title: 'Account',
                     user: user,
                     userName: user.name,
                    cards: cards
                 }
                );
   }
module.exports.createCard = async (req, res) => {
    const data = {
        name: req.body.cardName,
        email: req.body.cardEmail,
        phone: req.body.cardPhone,
        company: req.body.cardCompany,
        userId: req.userId
    };
    const newCard=await Card.create(data);
    res.status(200).json(newCard);
}
module.exports.me=async (req, res) => {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
}