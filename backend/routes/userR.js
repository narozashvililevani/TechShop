const express = require('express');
const User =  require('../models/userM');
const { getToken } =  require('../utils');

const router = express.Router();

router.post('/signin', async (req, res) => {

  const signinUser  = await User.findOne({
      email: req.body.email,
      password: req.body.password
  });

  if(signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser)
    })
  } else {
    return res.status(401).send( {msg: 'no user found with this email or password'});
  }

});

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const newUser = await user.save();
    if(newUser) {
        res.send({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser)
      })
    }

  } catch (error) {
      res.status(401).send( {msg: 'please provide valid data for all the fields'});
  }
});

// make admin acc | this is not provded in UI , 
router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
        name: 'levani',
        email: 'narozashvili@yahoo.com',
        password: '123456',
        isAdmin: true
    });

    const newUser = await user.save();

    res.send(user)

  } catch (error) {
        res.send({msg: error.message})
        console.log(error.message)
  }

});




module.exports =  router;