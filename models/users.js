var mongoose = require('mongoose');

var users = new mongoose.Schema({
    'id': Number,
    'login': String,
    'name': String,
    'email': String,
    'password': String,
    'contact_list': [],
    'black_list': []
});

module.exports = mongoose.model('users', users);



