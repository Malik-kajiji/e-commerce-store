import React, { useEffect, useState } from "react";
import {useRouter}from 'next/router';
import style from '../styles/pages/signup.module.css';
import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { initFirebase } from "../lib/fireaseConfig";
import GoogleButton from 'react-google-button';

const Signup = ({setShowenPage}) => {
    const [data,setData]=useState({email:'',password:'',confirmPassword:''});
    const [massage,setMassage]=useState('');
    const router = useRouter();
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
        const { email,password,confirmPassword } = data
        if(email === '' || password === '' || confirmPassword === ''){
            setMassage("make sure to fill up all the inputs")
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setMassage("the email is not valid")
        } else if( password !== confirmPassword){
            setMassage("the password does not match")
        } else {
            createUserWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                router.push('/account')
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
                        <input 
                            className={style.password+' TXT-heading3'} 
                            type="password"  
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(e)=>handleChange(e)}
                            value={data.confirmPassword}
                        />
                        <button 
                            className={style.Btn+' BTN'}
                            onClick={(e)=>handleClick(e)}
                        >SingUp</button>
                    </form>
                    <h2 className={style.or+' TXT-normal'}>OR</h2>
                    <GoogleButton
                        onClick={handleGoogleLogin}
                    />
                    <p className={style.text+' TXT-normal'}>have account already?
                        <span onClick={()=>setShowenPage('login')} className={style.signUp+' TXT-normal'}> login</span>
                    </p>
                </article>
                {massage.length !==0?<p className={style.popUp+' TXT-footer'}>{massage}dfgfdg</p>:<></>}
            </div>
        </section>
    );
}

export default Signup;