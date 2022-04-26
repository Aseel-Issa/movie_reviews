const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Movie's title is required"]
    },
    avgRating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: [true, "User is required"]
        },
        rating: {
            type: Number,
            required: [true, "Review rating is required"]
        },
        review: {
            type: String,
            required: [true, "Review is required"]
        }
    }]
})

const MovieModel = mongoose.model('Movie', MovieSchema)

module.exports={
    MovieModel
}