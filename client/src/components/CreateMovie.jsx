import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Review from '../classes/review'
import Movie from '../classes/movie'

export default function CreateMovie(props) {

    let navigate = useNavigate()

    const [rate, setRate] = useState(1)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [reviewText, setReviewText] = useState('')

    const handleListOnChange = (e) => {
        setRate(e.target.value)
    }

    const handleInputChange = (e) => {
        switch(e.target.name){
            case 'name' : setName(e.target.value)
            break;
            case 'review' : setReviewText(e.target.value)
            break;
            case 'title' : setTitle(e.target.value)
            break;
        }
    }

    const cancel = () => {
        navigate('/movies')
    }

    const submit = async () => {
        if(title.length == 0){
            alert('Movie title is required')
            return
        }
        if(reviewText.length < 10 ){
            alert('Rating must be 10 characters long at least')
            return
        }
        // if(name.length == 0 ){
        //     alert('name field is required')
        //     return
        // }

        let review = new Review(props.user._id, props.user.firstName, rate, reviewText)
        let movie = new Movie('', title, [review])

        // create movie object in db

        // update app movies list
        await props.addMovie(movie)
        navigate('/movies')
    }

    return (
        <div className='add-review-page'>
            <div className='header'>
                <div className='header-title'>
                    <h2>Submit a Movie and a Review</h2>
                </div>
            </div>
            <div className='note'>
                Movie title is required
            </div>
            <div>
                <table className='content-table'>
                    <tr>
                        <td><label>Movie Title</label></td>
                        <td><input name='title' value={title} onChange={handleInputChange}></input></td>
                    </tr>
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