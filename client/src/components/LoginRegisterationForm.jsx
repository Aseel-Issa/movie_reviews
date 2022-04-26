import RegisterationForm from './RegisterationForm'
import LoginComponent from './LoginComponent'
import { useNavigate } from 'react-router-dom'

export default function LoginRegisterationForm(props){

    let navigate = useNavigate()
    const navigateToMovies = () => {
        navigate('/movies')
    }

    return(<div>
        {/* <div className='Header'><h1>Welcome</h1></div> */}
        <div className='register-content'>
        <RegisterationForm login={props.login} navigateToMovies={navigateToMovies}></RegisterationForm>
        <LoginComponent login={props.login} navigateToMovies={navigateToMovies}></LoginComponent>
        </div>
        </div>)
}