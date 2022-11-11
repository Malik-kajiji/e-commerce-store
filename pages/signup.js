import React, { useEffect, useState } from "react";
import {useRouter}from 'next/router';
import style from '../styles/pages/signup.module.css';
import Link from 'next/link';
import { CartData }from '../context/CartContext'

const Signup = () => {
    const [data,setData]=useState({username:'',password:'',confirmPassword:''});
    const [passwordValidation,setPasswordValidation]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState(false);
    const [massage,setMassage]=useState('')
    const router = useRouter();
    const {account,setAccount} = CartData();

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
        if(passwordValidation && confirmPassword && data.username.length > 4){
            const prevAccounts = localStorage.getItem('accounts');
            if(prevAccounts){
                const Accounts = JSON.parse(prevAccounts);
                const newAccounts = [...Accounts,{username:data.username,password:data.password}]
                localStorage.setItem('accounts',JSON.stringify(newAccounts))
            } else {
                const newAccounts = [{username:data.username,password:data.password}]
                localStorage.setItem('accounts',JSON.stringify(newAccounts));
            }
            localStorage.setItem('account',data.username)
            setAccount(data.username);
            router.push('/');
        }
    }

    // to handle validation
    function handleValidatePassword() {
        const regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/; 
            if(data.password.length < 8 && data.password.length>0){
                setMassage('password should contain at least 8 character')
                setPasswordValidation(false)
            }
            if(data.password.length > 16){
                setMassage('password should contain atmaximum 16 character')
                setPasswordValidation(false)
            }
            if(data.password.length <= 16 && data.password.length >= 8){
                if(!regularExpression.test(data.password)) {
                    setMassage("password should contain atleast one number and one special character");
                    setPasswordValidation(false)
                }else if(regularExpression.test(data.password)) {
                    setPasswordValidation(true)
                    setMassage("")
                }
            }
    }
    useEffect(()=>handleValidatePassword(),[data.password.length]);


    // to handle confirmation
    function handleConfirmPassword(){
        if(data.password !== data.confirmPassword){
                setMassage("make sure to match the password")
                setConfirmPassword(false)
            }else if(data.password === data.confirmPassword){
                setConfirmPassword(true)
                setMassage('')
            }
        }
    useEffect(()=>handleConfirmPassword(),[data.confirmPassword.length])

    return ( 
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.login}>
                    <form action="" className={style.form}>
                        <input 
                            className={style.username+' TXT-heading3'} 
                            type="text" 
                            placeholder="UserName"
                            name="username"
                            onChange={(e)=>handleChange(e)}
                            value={data.username}
                            
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
                    <p className={style.text+' TXT-normal'}>have account already?
                        <Link href='/login'><span className={style.signUp+' TXT-normal'}> login</span></Link>
                    </p>
                </article>
                {massage.length !==0?<p className={style.popUp+' TXT-footer'}>{massage}</p>:<></>}
            </div>
        </section>
    );
}

export default Signup;