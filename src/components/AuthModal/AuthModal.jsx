import './AuthModal.css'
import { Close } from "@mui/icons-material";
import Button from '../Button/Button';
import { useState } from 'react';
import {useCookies} from 'react-cookie' 
import axios from 'axios'

const AuthModal = ({isSignUp,setShowModal})=>{
    const [credentials,setCredentials] = useState({
        email:'',
        password:'',
        confirmPassword:''
    })
    const [error,setError] = useState(null)
    const [cookies,setCookie]=useCookies(null)
    const [disable,setDisabled] = useState(false)


    const handleSubmit=async (e)=>{
        console.log(cookies)
        setDisabled(true)
        try{
            e.preventDefault()
        }catch(err){
            console.log(err)
        }
        if(isSignUp){
            if(credentials.confirmPassword===credentials.password){
                setError(null)
                console.log(`http://localhost:8000/signup`)
                console.log('make a post request')
                const response = await axios.post(`http://localhost:8000/${isSignUp?'signup':'login'}`,{email:credentials.email,password:credentials.password,orders:[]})
                console.log(response)
                setCookie('UserId',response.data.userId)
                setCookie('AuthToken',response.data.token)
                const success = response.status === 201
                if(success) setShowModal(false)
            }else{
                setError("Passwords are not matching")
                setDisabled(false)
            }
        }else{
            const response = await axios.post(`http://localhost:8000/login`,{email:credentials.email,password:credentials.password})
            
            console.log(response)
            if(response.data.userId){
                await setCookie('UserId',response.data.userId)
			    await setCookie('AuthToken',response.data.token)
                setShowModal(false)
            }else{
                setError('Invalid Credentials')
                setDisabled(false)
            }
        }


    }

    const handleChange=(e)=>{
        setCredentials(prevValue=>{
            return {...prevValue,[e.target.name]:e.target.value}})
    }

    return <div className='authmodal-cover'>
    <div className="auth-modal">
        <i onClick={()=>{setShowModal(false)}}><Close /></i>
        <h2>{isSignUp?'Create Account':'Login'}</h2>
        <form onSubmit={handleSubmit}>
            {/* <img src={isSignUp?SignUp:Login} alt='login or sign up'/> */}
            <input type='email' onChange={handleChange} name='email' placeholder='Email' value={credentials.name}/>
            <input type='password' onChange={handleChange} name='password' placeholder='Password' value={credentials.password}/>
            {isSignUp&&<input type='password' 
                name='confirmPassword' 
                placeholder='Confirm Password' 
                onChange={handleChange}
                value={credentials.confirmPassword}/>}
            {error&&<p className='error'>{error}</p>}
            <Button Disabled={disable}>Submit</Button>
        </form>
    </div>
    </div>
}

export default AuthModal;