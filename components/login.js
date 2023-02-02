import React, { useState } from "react";
import style from '../styles/pages/login.module.css';
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { initFirebase } from "../lib/fireaseConfig";
import GoogleButton from 'react-google-button';

const Login = ({setShowenPage}) => {
    const [data,setData]=useState({email:'',password:''});
    const [massage,setMassage]=useState('');
    const { auth } = initFirebase();

    function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setData(prevData => {
            return {
                ...prevData,
                [name]:value
            }
        })
    }
    function handleClick(e){
        e.preventDefault();
        const { email,password  } = data
        if(email === '' || password === ''){
            setMassage("make sure to fill up all the inputs")
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setMassage("the email is not valid")
        } else {
            signInWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                
            })
            .catch((err)=>{
                setMassage(err.message)
            })
        }
    }
    function handleGoogleLogin(){
        const GoogleProvider = new GoogleAuthProvider()
        signInWithPopup(auth,GoogleProvider)
        .then(res => {
            
        })
        .catch(err =>{
            setMassage(err.message)
        })
    }
    return ( 
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.login}>
                    <form action="" className={style.form}>
                        <input 
                            className={style.username+' TXT-heading3'} 
                            type="email" 
                            placeholder="email"
                            name="email"
                            onChange={(e)=>handleChange(e)}
                            value={data.email}
                        />
                        <input 
                            className={style.password+' TXT-heading3'} 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={(e)=>handleChange(e)}
                            value={data.password}
                        />
                        <button 
                            className={style.Btn+' BTN'}
                            onClick={(e)=>handleClick(e)}
                        >Login</button>
                    </form>
                    <h2 className={style.or+' TXT-normal'}>OR</h2>
                    <GoogleButton
                        onClick={handleGoogleLogin}
                    />
                    <p className={style.text+' TXT-normal'}>dont have account?
                        <span onClick={()=>setShowenPage('signup')} className={style.signUp+' TXT-normal'}> sign up</span>
                    </p>
                </article>
                {massage.length?<p className={style.popUp+' TXT-footer'}>{massage}</p>:<></>}
            </div>
        </section>
    );
}

export default Login;