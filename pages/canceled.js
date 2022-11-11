import style from '../styles/pages/canceled.module.css';
import Link from 'next/link';
import {BsFillBagXFill} from 'react-icons/bs';

const Canceled = () => {
    return ( 
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.card}>
                    <h1 className={style.mainHeading+' TXT-heading2'}>Ooops looks like theres a problem!</h1>
                    <p className={style.p+' TXT-normal'}>you can check your email to see the issue </p>
                    <p className={style.icon}>{BsFillBagXFill()}</p>
                    <Link href='/'>
                        <button type='button' className={style.Btn+' BTN'}>go back to home page </button>
                    </Link>
                </article>
            </div>
        </section> 
    );
}

export default Canceled;