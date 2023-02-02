import React,{useEffect} from 'react';
import style from '../styles/pages/success.module.css';
import Link from 'next/link';
import {BsFillBagCheckFill} from 'react-icons/bs';
import { doc,setDoc } from 'firebase/firestore';
import { initFirebase } from '../lib/fireaseConfig';
import { AppData } from '../context/AppContext';

const Success = () => {
    const { db } = initFirebase();
    const { user } = AppData();

    useEffect(()=>{
        if(user){
            const itemsRef = doc(db,'cartitems', user.uid);
            setDoc(itemsRef,{items:[]})
            .then(()=>{
    
            })
            .catch((err)=>{
    
            })
        }
    },[user])

    return (
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.card}>
                    <h1 className={style.mainHeading+' TXT-heading2'}>thanks for your order!</h1>
                    <p className={style.p+' TXT-normal'}>you can check your email to see payment details </p>
                    <p className={style.icon}>{BsFillBagCheckFill()}</p>
                    <Link href='/'>
                        <button type='button' className={style.Btn+' BTN'}>go back to home page </button>
                    </Link>
                </article>
            </div>
        </section> 
    );
}

export default Success;