'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AsteroidSchema = Schema({
    full_name: String,
    a: Number,
    e: Number,
    i: Number,
    om: Number,
    w: Number,
    ma: Number

})

module.exports = mongoose.model('Asteroids', AsteroidSchema)