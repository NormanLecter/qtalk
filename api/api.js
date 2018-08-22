var express = require('express')
var api = express.Router()
var uuid = require('uuid/v4')
const ConnectionHistory = require('./models/connection_history.ts')
const Room = require('./models/room.ts')

const mongoose = require('mongoose');
mongoose.connect('mongodb://qtalk:trytytki1@ds125402.mlab.com:25402/qtalk');

let changeRoomStatus = (roomNumber, status) => {
    Room.update({number: roomNumber}, {
        status: status
    }, (err, numberAffected, rawResponse) => {
    })
}

let createRoom = (number, name, status, ownerName, ownerKey) => {
    room = new Room({
        number: number,
        name: name,
        status: status,
        status: 'waiting',
        ownerName: ownerName,
        ownerKey: ownerKey
    })
    room.save()

    connectionHistory = new ConnectionHistory({
        roomNumber: number,
        roomName: name,
        ownerName: ownerName,
        ownerKey: ownerKey, 
        timestamp: Date.now()
    })
    connectionHistory.save()
}

let deleteRoom = roomNumber => {
    let roomIndex = getRoomIndex(roomNumber)

    rooms.splice(roomIndex, 1)
}

api.post('/login', (req, res) => {
    res.redirect('/');
})

api.get('/connections-history', (req, res) => {
    res.contentType('json')

    ConnectionHistory.find().then(result => {
        res.send(result)
    })
})

api.post('/room/create', (req, res) => {
    res.contentType('json')
    let body = req.body

    let roomNumber = body['number']
    let roomName = body['name']
    let ownerName = body['ownerName']

    ownerKey = uuid()
        
        createRoom(
            roomNumber,
            roomName,
            'waiting',
            ownerName,
            ownerKey
        )

        res.send({key: ownerKey})

    if (room) {
        res.sendStatus(403)
    } else {
        
    }
})

api.post('/room/join', (req, res) => {
    res.contentType('json')
    let roomNumber = req.param('number')

    Room.findOne({number: roomNumber}).then(result => {
        if (result == null) {
            res.sendStatus(403)
        } else {
            if (result.status === 'waiting') {
                changeRoomStatus(roomNumber, 'busy')
                res.sendStatus(200)
            } else {
                res.sendStatus(403)
            }
        }
    })
})

api.post('/room/leave', (req, res) => {
    res.contentType('json')
    let roomNumber = req.param('number')

    Room.findOne({number: roomNumber}).then(result => {
        if (result == null) {
            res.sendStatus(403)
        } else {
            if (result.status === 'busy') {
                changeRoomStatus(roomNumber, 'waiting')
                res.sendStatus(200)
            } else {
                res.sendStatus(403)
            }
        }
    })
})

api.post('/room/remove', (req, res) => {
    res.contentType('json')
    let roomNumber = req.param('number')

    let ownerKey = req.param('key')

    Room.findOne({number: roomNumber}).then(result => {
        if (result == null) {
            res.sendStatus(403)
        } else {
            if (result.ownerKey === ownerKey) {
                result.remove()
                res.sendStatus(200)
            } else {
                res.sendStatus(403)
            }
        }
    })
})

api.get('/room/status', (req, res) => {
    res.contentType('json')
    let roomNumber = req.param('number')

    Room.findOne({number: roomNumber}).then(result => {
        if (result == null) {
            res.send({status: 'free'})
        } else {
            res.send({status: result.status})
        }
    })
})

module.exports = api;