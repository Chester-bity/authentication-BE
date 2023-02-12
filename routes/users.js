var express = require('express');
var router = express.Router();
const moment = require('moment');
const crypto = require('../services/crypto.js')
const secretkey = process.env.SECRETKEY;
const queries = require('../queries/user')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!(email && name && password)) {
      res.status(500).send('Invalid input!')
      return
    }
    const user = await queries.getOneEmail(email)
    console.log(user);
    if (!user) {
      if (!password) {
        res.status(500).json({ error: "No Password" });
      }

      const encrypted = crypto.encrypt(password)

      const user = {
        name: name,
        email: email,
        password: encrypted,
      };
      queries.create(user).then(data => {
        res.json({ message: "user registered" });
      });
    }
    else {
      res.status(500).json({ message: 'email already in use' });
    }
  } catch (ex) {
    res.status(500).send(ex);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await queries.getOneEmail(email).then(data => data)
  if (user) {
    const encryptedPassword = user.password
    const checkPassword = crypto.compare(password, encryptedPassword);

    if (checkPassword) {
      const expireDateTime = moment().add(6, 'hours').format();
      jwt.sign({ user }, secretkey, { expiresIn: '6h' }, (err, token) => {//around 1 Hour to expires
        res.cookie('token', token, { expires: new Date(expireDateTime) });
        res.status(200).send({message: 'success'});
      });
    } else {
      res.status(500).send({ message: "Invalid password" });
    }
  } else {
    res.status(500).send({ message: "Invalid user" });
  }
});

router.get('/all', async (req, res, next) => {
  const result = await queries.getAll();
  res.send(result);
})

module.exports = router;
