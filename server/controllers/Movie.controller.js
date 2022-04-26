
const {MovieModel} = require('../models/Movie')


const save = async function (movieObj) {
    try {
      const movie = new MovieModel(movieObj)
      const result = await movie.save()
      const response = result.populate({path: 'reviews.user', select: ['_id', 'firstName']})
      return response
    } catch (e) {
      return e.toString()
    }
  
  }

  const getAll = async function (){
      try{
        const response = await MovieModel.find({}).populate({path: 'reviews.user', select: ['_id', 'firstName']})
        return response
      }catch(e){
          return e.toString()
      }
  }


  const remove = async function (movieObj){
    try{
        const response = await MovieModel.deleteOne(movieObj)
        return response
      }catch(e){
          return e.toString()
      }
  }

  const update = async function (movieObj) {
      try{
          console.log(movieObj)
          const response = await MovieModel.findOneAndUpdate({_id: movieObj._id}, movieObj, { new: true }).populate({path: 'reviews.user', select: ['_id', 'firstName']})
          console.log(response)
          return response
      }catch(e){
          return e.toString()
      }
  }

  module.exports = {
      save,
      getAll,
      remove,
      update
  }