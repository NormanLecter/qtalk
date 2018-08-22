var mongoose = require('mongoose');

var room = new mongoose.Schema({
    'number': String,
    'name': String,
    'status': String,
    'ownerName': String,
    'ownerKey': String
});

module.exports = mongoose.model('room', room);