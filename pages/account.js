import style from '../styles/pages/account.module.css';
import Link from 'next/link';
import {CartData}from '../context/CartContext'
import {useRouter}from 'next/router'
const Account = () => {
    const {account,setAccount,setCartProducts} = CartData();
    const router = useRouter()
    function handleClick(){
        localStorage.setItem('account',null)
        setAccount('')
        setCartProducts([])
        router.push('/')
    }
    return ( 
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.account}>
                    <img className={style.image} src="/profile-picture.png" alt="" />
                    <h1 className={style.userName+' TXT-heading2'}>{account}</h1>
                    <button 
                        className={style.Btn +' BTN'}
                        onClick={handleClick}
                        >log out
                        </button>
                </article>
            </div>
        </section>
    );
}

export default Account;