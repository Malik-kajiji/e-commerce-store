import React, { useState } from "react";
import {useRouter}from 'next/router'
import style from '../styles/pages/login.module.css'
import Link from 'next/link'
import { CartData }from '../context/CartContext'

const Login = () => {
    const [data,setData]=useState({username:'',password:''});
    const [massage,setMassage]=useState('')
    const {account,setAccount} = CartData();
    const router = useRouter()

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
        const prevAccounts = localStorage.getItem('accounts');
        if(prevAccounts){
            const accounts = JSON.parse(prevAccounts);
            const accountExist = accounts.filter(account=>{
                return account.username == data.username;
            });
            if(accountExist.length > 0){
                if(accountExist[0].password == data.password){
                    localStorage.setItem('account',data.username);
                    setAccount(data.username);
                    router.push('/')
                }
                if(accountExist[0].password !== data.password)setMassage('wrong Password')
            } else {
                setMassage('account dose not exist')
            }
        }else {
            setMassage('account dose not exist')
        }
    }
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
                        <button 
                            className={style.Btn+' BTN'}
                            onClick={(e)=>handleClick(e)}
                        >Login</button>
                    </form>
                    <p className={style.text+' TXT-normal'}>dont have account?
                        <Link href='/signup'><span className={style.signUp+' TXT-normal'}> sign up</span></Link>
                    </p>
                </article>
                {massage.length?<p className={style.popUp+' TXT-footer'}>{massage}</p>:<></>}
            </div>
        </section>
    );
}

export default Login;