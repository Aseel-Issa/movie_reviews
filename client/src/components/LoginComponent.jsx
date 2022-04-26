
import { useState } from 'react'
import axios from 'axios'
import User from '../classes/User'
const Base_Url = 'http://localhost:3000'
export default function LoginComponent(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleInput = (e) => {
        switch (e.target.id) {
            case 'email': setEmail(e.target.value);
                break;
            case 'password': setPassword(e.target.value);
                break;
        }
    }
    const submit = async () => {
        // all fields are required
        if (email === '' || password === '') {
            alert('All fields are required')
            return
        }

        let credentials = {
            email: email,
            password: password
        }

        // login request to server
        try {

            // url ahould be http://localhost:3000/api/login

            let result = await axios.post(Base_Url+'/api/login', credentials)
            console.log(result)
            let loggedInUser = new User(result.data._id, result.data.firstName, result.data.lastName, result.data.email)
            // console.log(loggedInUser)
            // impedent login
            props.login(loggedInUser)
            // redirect to movies page
            props.navigateToMovies()
        } catch (e) {
            alert('your credentials is not valid, pleas try again')
            console.log(e)
            return
        }

    }

    return (
        <div className='login'>
            <div className='subtitle'><h2>Login</h2></div>
            <div className='input-div'>
                <label>Email</label>
                <input id='email' value={email} onChange={handleInput}></input>
            </div>
            <div className='input-div'>
                <label>password</label>
                <input type="password" id='password' value={password} onChange={handleInput}></input>
            </div>
            <button id='loginBtn' onClick={submit}>Login</button>
        </div>
    )
}