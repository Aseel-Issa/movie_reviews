
export default class Movie{
    constructor(_id, title, reviews){
        this._id = _id
        this.title = title
        this.reviews = reviews
        this.calculate_avg_rating()
    }

    calculate_avg_rating(){
        if(this.reviews.length == 0){
            return 0
        }
        let sum = 0
        this.reviews.forEach(r => {
            sum+=Number(r.rating)
        });
        let avg = sum/this.reviews.length
        this.avgRating = avg
    }

    pushReview(review){
        // update avg rating each time we add a new review
        this.reviews.push(review)
        this.calculate_avg_rating()
    }
    
    deleteReview(reviewIndex){
        // update avg rating each time we delete a review
        this.reviews.splice(reviewIndex, 1)
        this.calculate_avg_rating()
    }
}