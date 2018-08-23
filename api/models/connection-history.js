const mongoose = require('mongoose');

const connection_history = new mongoose.Schema({
    'roomNumber': String,
    'roomName': String,
    'ownerName': String,
    'ownerKey': String,
    'timestamp': String
});

module.exports = mongoose.model('connection_history', connection_history);
