var express = require('express');
var router = express.Router();

const homeTemplate = require('../views/home');
const aboutTemplate = require('../views/about');
const contactTemplate = require('../views/contact');
const petTemplate = require('../views/pet');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

router.get('/pet', (req, res) => {
  res.render('pet', { title: 'Pet' });
});

module.exports = router;
