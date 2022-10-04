import { useState } from 'react';
import './connection.css'
import logo from './images/logo.png'
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from '../utils/firebase';


const Login = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    let navigate = useNavigate();
    const log=()=>{
if(Email!=='' && Password!==''){
// axios.post('http://localhost:40374/api/user/login',{Email,Password}).then(res=>{
//     if(res.data!=="404 user not found"){
//         localStorage.setItem('token',res.data)
//         navigate("/")
//     }
//     else{
//         alert(res.data)
//     }
// })
signInWithEmailAndPassword(Email, Password).then(res=>{
    if(res==true){
        let username=Email.substring(0,Email.indexOf('@'))
        if(username==="admin"){
            localStorage.setItem("rank","1")
        }
        else{
            localStorage.setItem("rank","0")
        }
        localStorage.setItem("agent",username)
        navigate('/react-gh-pages/dashboard')
    }
})


}
else{
    alert("email et mot de passe sont requis")
}
    }
    return (
        <div class="login-page">
            <div class="form">
                <img style={{ width: '90%' }} src={logo} alt="" />
                <div class="login-form">
                    <input type="text" placeholder="username"onChange={(e)=>{
                        setEmail(e.target.value)
                    }} required/>
                    <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} required/>
                    <button onClick={log}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;