import React,{useEffect} from 'react';
import { CartData } from '../context/CartContext';
import style from '../styles/pages/success.module.css';
import Link from 'next/link';
import {BsFillBagCheckFill} from 'react-icons/bs'

const Success = () => {

    const {setCartProducts} = CartData();

    useEffect(()=>{
        setCartProducts(new Array());
        localStorage.setItem('cartProducts',null)
    },[])

    return (
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.card}>
                    <h1 className={style.mainHeading+' TXT-heading2'}>thank for your order!</h1>
                    <p className={style.p+' TXT-normal'}>you can check your email to see payment information </p>
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