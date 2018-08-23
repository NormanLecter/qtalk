var mongoose = require('mongoose');

var connectionsHistory = new mongoose.Schema({
    'first_user_public_ip': String,
    'second_user_public_ip': String,
    'first_user_id': Number,
    'second_user_id': Number,
    'first_user_port': Number,
    'second_user_port': Number,
    'start_connection': Date,
    'end_connection': Date
});

module.exports = mongoose.model('connectionsHistory', connectionsHistory);



