
const mongoose = require('mongoose')
// mongoose is a singleton, so connecting to db once is enough
mongoose.connect('mongodb://127.0.0.1/voting-dojo-app', { useNewUrlParser: true })

const User = require('../controllers/User.controller')
const Movie = require('../controllers/Movie.controller')

const saveUser = async function(userObj){
    return User.save(userObj)
}

const getUser = async function(userObj){
    return User.find(userObj)
}

const saveMovie = async function(movieObj){
    return Movie.save(movieObj)
}

const getAllMovies= async function(){
    return Movie.getAll()
}

const removeMovie = async function(movieObj){
    return Movie.remove(movieObj)
}

const updateMovie = async function(movieObj){
    return Movie.update(movieObj)
}

module.exports = {
    saveUser,
    getUser,
    saveMovie,
    getAllMovies,
    removeMovie,
    updateMovie
}