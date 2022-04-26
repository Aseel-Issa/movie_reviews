import TableRow from './TableRow'
import { useNavigate } from 'react-router-dom'

export default function AllMovies(props) {


    let navigate = useNavigate()
    const navigateToCreatePage = () => {
        navigate('/movies/new')
    }
    let rowCount = 0

    return (
        <div>
            <div className='header'>
                <div className='header-title'>
                    <h2>Movie List</h2>
                </div>
                <div className='header-btn'>
                    <button id='addNew' onClick={navigateToCreatePage}>Add a New Movie</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>Movie Title</th>
                    <th>Avg Rating</th>
                    <th>Actions</th>
                </tr>
                {props.movies.map(m => {
                    let classType = rowCount % 2 == 0 ? 'dark' : 'light'
                    rowCount++
                    return (<TableRow classType={classType} movie={m} key={m._id} />)

                })}
            </table>
        </div>
    )
}