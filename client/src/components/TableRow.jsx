import {useNavigate} from 'react-router-dom'
import Review from '../classes/review';

export default function TableRow (props) {

    let navigate = useNavigate()
    const readReviews = () => {
        navigate('/movies/'+props.movie._id)
    }
    const writeReview = () => {
        navigate('/movies/'+props.movie._id+"/review")
    }

    return (
        <tr className={props.classType}>
                            <td>{props.movie.title}</td>
                            <td>{props.movie.avgRating}</td>
                            <td><button id='read-reviews-btn' onClick={readReviews}>Read Reviews</button><button id='write-review-btn' onClick={writeReview}>Write a Review</button></td>
                        </tr>
    )
}