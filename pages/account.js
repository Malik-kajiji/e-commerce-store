import style from '../styles/pages/account.module.css';
import Login from '../components/login';
import Signup from '../components/signup';
import { useState } from 'react';
import { AppData } from '../context/AppContext';
import { signOut  } from 'firebase/auth';
import { initFirebase } from '../lib/fireaseConfig';
const Account = () => {
    const { isLoggedIn, user  } = AppData()
    const { auth  } = initFirebase()
    const [showenPage,setShowenPage] = useState('signup')
    function handleClick(){
        signOut(auth)
    }
    if(isLoggedIn){
        return (
            <section className={style.mainSection}>
                <div className={style.container+' container'}>
                    <article className={style.account}>
                        <img className={style.image} src="/profile-picture.png" alt="" />
                        <h1 className={style.userName+' TXT-heading2'}>{user.email}</h1>
                        <button 
                            className={style.Btn +' BTN'}
                            onClick={handleClick}
                            >log out
                            </button>
                    </article>
                </div>
            </section>
        );
    } else if(showenPage === 'signup' ){
        return <Signup setShowenPage={setShowenPage} />
    } else if(showenPage === 'login'){
        return <Login setShowenPage={setShowenPage} />
    } 
}

export default Account;