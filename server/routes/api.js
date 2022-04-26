
const express = require('express')
const router = express.Router()
const DbManager = require('../models/DBManager')
const jwt = require("jsonwebtoken");
const { authenticate } = require('../config/jwt.config')
const bcrypt = require('bcrypt')

// a sanity check to make sure the server works
router.get('/api/sanity', function (request, response) {
    console.log("Ok!")
    response.send('Ok!')
})
// logout
router.get('/api/logout', function (req, res){
    res.clearCookie('usertoken');
    res.sendStatus(200);
})

// login
router.post('/api/login', async function (req, res){
    const credentials = req.body
    const result = await DbManager.getUser({email: credentials.email})
    if(result === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(credentials.password, result.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    const payload = {
        id: result._id
    };
       
    //using the SECRET_KEY from our .env file
    const userToken = jwt.sign(payload, process.env.SECRET_KEY);
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        // return specific fields only
        .send({_id: result._id, firstName: result.firstName, lastName: result.lastName, email: result.email});
})

// create new user
router.post('/api/user', async function (req, res){
    const user = req.body
    // console.log(user)
    const result = await DbManager.saveUser(user)
    console.log(result)
    const payload = {
        id: result._id
    };
       
    //using the SECRET_KEY from our .env file
    const userToken = jwt.sign(payload, process.env.SECRET_KEY);
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        // return specific fields only
        .send({_id: result._id, firstName: result.firstName, lastName: result.lastName, email: result.email});
    })

router.get('/api/user/:email', async function(req, res){
    const result = await DbManager.getUser({email: req.params.email})
    res.send(result)
})

// route to get all Movies, access should be authenticated
router.get('/api/movies', authenticate, async function(req, res){
    const result = await DbManager.getAllMovies()
    res.send(result)
})

// route to create new movie, access should be authenticated
router.post('/api/movie/new', authenticate, async function(req, res){
    const movie = req.body
    const result = await DbManager.saveMovie(movie)
    res.send(result)
})

// route to delete a movie based on its id, access should be authenticated
router.delete('/api/movie/:id', authenticate, async function(req, res){
    const movie = {_id: req.params.id}
    const result = await DbManager.removeMovie(movie)
    res.send(result)
})

// route to update a movie based on its id, access should be authenticated
router.put('/api/movie', authenticate, async function(req, res){
    const movie = req.body
    const result = await DbManager.updateMovie(movie)
    res.send(result)
})

module.exports = router;
