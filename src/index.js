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

app.get('/api/asteroids',(req, res) => {
    Asteroids.find({}, (err, asteroids) => {
        if (err) return res.status(500).send({message: `Request error: ${err}`})
        if (!asteroids) return res.status(404).send({message: 'There is no asteroid in the records'})

        res.send(200, {asteroids})
    })
})

app.get('/api/asteroid/:Id',(req, res) => {
 let asteroidId = req.params.Id

 Asteroids.findById(asteroidId, (err, asteroid) => {
     if (err) return res.status(500).send({message: `Request error: ${err}`})
     if (!asteroid) return res.status(404).send({message: `The asteroid does not exist`})

     res.status(200).send({ asteroid})
    })

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

app.put('/api/asteroid/:asteroidId', (req, res) => {
    let asteroidId = req.params.asteroidId
    let update = req.body

    Asteroids.findByIdAndUpdate(asteroidId, update, (err, asteroidUpdated) => {
        if (err) return res.status(500).send({ message: `Failed to update asteroid parameters: ${err}`})
        
        res.status(200).send({ asteroid: asteroidUpdated })
    })

})

app.delete('/api/asteroid/:asteroidId', (req, res) => {
    let asteroidId = req.params.asteroidId
    console.log(asteroidId)

    Asteroids.findById(asteroidId, (err, asteroid) => {
        if (err) return res.status(500).send({message: `Failed to clear asteroid record: ${err}`})

        asteroid.remove(err => {
         if (err) return res.status(500).send({message: `Failed to clear asteroid record: ${err}`})
         return res.status(200).send({message: "The asteroid record has been deleted"})
        })
    }) 
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