import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom'
import ReviewerCell from './ReviewerCell'
import Movie from "../classes/movie";

export default function ReviewsTable (props) {

    let navigate = useNavigate()

    const { id } = useParams()

    let results = props.movies.filter(m => {
        return m._id == id
    })

    let movie = results[0]

    const deleteMovie = async () => {
        await props.deleteMovie(id)
        navigate('/movies')
    }

    const deleteReview = async (index) => {
        let newMovie = new Movie(movie._id, movie.title, movie.reviews )
        newMovie.deleteReview(index)
        props.updateMovie(newMovie)
    }

    let rowCount = 0
    return(
        <div>
        <div className='header'>
            <div className='header-title'>
                <h2>Reviews for {movie.title}</h2>
            </div>
        </div>
        {/* should create table component that takes list of headers and list of records */}
        <table>
            <tr>
                <th>Reviewer</th>
                <th>Rating</th>
                <th>Review</th>
            </tr>
            {movie.reviews.map(r => {
                let classType = rowCount % 2 == 0 ? 'dark' : 'light'
                rowCount++
                return (<tr>
                    {/* <td className={classType}>{r.reviwer} <button onClick={deleteReview}>Del</button></td> */}
                    <ReviewerCell classType={classType} r={r} index={rowCount-1} deleteReview={deleteReview} loggedInUser={props.loggedInUser}></ReviewerCell>
                    <td className={classType}>{r.rating}</td>
                    <td className={classType}>{r.content}</td>
                </tr>)

            })}
        </table>
        <button id='delete-movie' onClick={deleteMovie}>Delete Movie</button>
    </div>
    )
}