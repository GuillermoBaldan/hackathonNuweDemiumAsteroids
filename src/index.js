'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Asteroids = require('../models/asteroids')

const app = express();
const port = process.env.PORT || 3001


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* app.get('/hola/:name', (req, res)=> {
    res.send({ message: req.params.name });
}) 
 */

app.get('/api/asteroid',(req, res) => {
res.send(200, {asteroids: []})
})

app.get('/api/asteroid/:name',(req, res) => {

})


app.post('/api/asteroid', (req,res) => {
   console.log('POST /api/asteroid')
   console.log(req.body)
   //res.status(200).send({message: 'asteroid written in database'})
   
   let asteroid = new Asteroids()
   asteroid.full_name = req.body.full_name;
   asteroid.a = req.body.a
   asteroid.e = req.body.e
   asteroid.i = req.body.i
   asteroid.om = req.body.om
   asteroid.w = req.body.w
   asteroid.ma = req.body.ma

   asteroid.save((err, asteroidSaved) => {
   if (err) res.status(500).send({message: `Error when saving asteroid in database: ${err}`})

   res.status(200).send(asteroid)
   })
})

app.put('/api/asteroid/:name', (req, res) => {

})

app.delete('api/asteroid/:name', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/asteroids', (err, res) => {
    if (err) {
        return console.log(`Error de conexión a la base de datos: ${err}`);
    } 
    console.log("Conexión a la base de datos establecida")

})

app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`);
})