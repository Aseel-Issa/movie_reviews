import { useParams } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Review from '../classes/review'

export default function AddReview(props) {

    let navigate = useNavigate()

    const [rate, setRate] = useState(1)
    const [name, setName] = useState('')
    const [reviewText, setReviewText] = useState('')

    const { id } = useParams()

    let results = props.movies.filter(m => {
        return m._id == id
    })

    let movie = results[0]
    // console.log(movie)

    const handleListOnChange = (e) => {
        setRate(e.target.value)
    }

    const handleInputChange = (e) => {
        switch(e.target.name){
            case 'name' : setName(e.target.value)
            break;
            case 'review' : setReviewText(e.target.value)
            break;
        }
    }

    const cancel = () => {
        navigate('/movies/'+id)
    }

    const submit = async () => {
        if(reviewText.length < 10 ){
            alert('Rating must be 10 characters long at least')
            return
        }
        // if(name.length == 0 ){
        //     alert('name field is required')
        //     return
        // }

        let review = new Review(props.user._id, props.user.firstName, rate, reviewText)
        console.log(review)
        movie.pushReview(review)

        // update movie object in db

        // update app movies list
        await props.updateMovie(movie)
        navigate('/movies/'+id)
    }

    return (
        <div className='add-review-page'>
            <div className='header'>
                <div className='header-title'>
                    <h2>Add a review for {movie.title}</h2>
                </div>
            </div>
            <div className='note'>
                Rating must be at least 10 characters long
            </div>
            <div>
                <table className='content-table'>
                    <tr>
                        <td><label>Your Name </label></td>
                        <td><label>{props.user.firstName}</label></td>
                        {/* <td><input name='name' value={name} onChange={handleInputChange}></input></td> */}
                    </tr>
                    <tr>
                        <td><label>Rating </label></td>
                        <td><select name="selectList" id="position" onChange={handleListOnChange} value={rate}>
                            <option value='1' key='1'>1</option>
                            <option value='2' key='2'>2</option>
                            <option value='3' key='3'>3</option>
                            <option value='4' key='4'>4</option>
                            <option value='5' key='5'>5</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td><label>Your Review </label></td>
                        <td><textarea name='review' type='' value={reviewText} onChange={handleInputChange}></textarea></td>
                    </tr>
                </table>
            </div>
            <div className='buttons-div'>
                <button id='submit-review' onClick={submit}>Submit</button>
                <button id='cancel-review' onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}