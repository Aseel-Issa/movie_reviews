import { useState } from 'react'
import axios from 'axios'
import User from '../classes/User'
const Base_Url = ''
// 'http://localhost:3000'

export default function RegisterationForm(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')


    const handleInput = (e) => {
        switch(e.target.id){
            case'firstName': setFirstName(e.target.value);
            break;
            case'lastName': setLastName(e.target.value);
            break;
            case'email': setEmail(e.target.value);
            break;
            case'password': setPassword(e.target.value);
            break;
            case'confirm-password': setConfirmedPassword(e.target.value);
            break;
        }
    }

    const submit = async () => {

        // the two passwords should be identical
        if(!(password===confirmedPassword)){
            alert('The two passwords are not identical')
            return
        }
        // all fields are required
        if(firstName === '' || lastName==='' || email==='' || password===''){
            alert('All fields are required')
            return
        }
        // create new user to server
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        let result = await axios.post(Base_Url+'/api/user', user)
        console.log(result)
        let loggedInUser = new User(result.data._id, result.data.firstName, result.data.lastName, result.data.email) 
        // console.log(loggedInUser)
        // impedent login
        props.login(loggedInUser)
        // redirect to pirates page
        props.navigateToMovies()
    }

    return (<div className='registeration'>
        <div className='subtitle'><h2>Register</h2></div>
        <div  className='input-div'>
            <label>First name:</label>
            <input id='firstName' value={firstName} onChange={handleInput}></input>
        </div>
        <div  className='input-div'>
            <label>LastName:</label>
            <input id='lastName' value={lastName} onChange={handleInput}></input>
        </div>
        <div  className='input-div'>
            <label>Email:</label>
            <input id='email' value={email} onChange={handleInput}></input>
        </div>
        <div  className='input-div'>
            <label>Password:</label>
            <input type="password" id='password' value={password} onChange={handleInput}></input>
        </div>
        <div  className='input-div'>
            <label>Confirm password:</label>
            <input type="password" id='confirm-password' value={confirmedPassword} onChange={handleInput}></input>
        </div>
        <button id='registerationBtn' onClick={submit}>Register</button>
    </div>)
}