var express = require('express')
var api = express.Router()

api.post('/login', (req, res) => {
    res.redirect('/');
})

module.exports = api;