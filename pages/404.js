import React from "react";
import style from '../styles/pages/404.module.css'
import Link from 'next/link'

const NotFound = () => {
    return ( 
        <section className={style.mainSection}>
            <div className={style.container+ ' container'}>
                <article className={style.content}>
                    <h1 className={style.mainHeading+' TXT-heading'}>Oooops...</h1>
                    <p className={style.text+' TXT-heading3'}>looks like there nothing to show here.</p>
                    <img className={style.image} src="/notfound.svg" alt="" />
                    <Link href='/'>
                        <button className={style.Btn+ ' BTN'}>
                            go back to home page
                        </button>
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default NotFound;