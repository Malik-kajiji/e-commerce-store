import React from "react";
import style from '../styles/pages/aboutus.module.css'
import Link from 'next/link'

const Aboutus = () => {
    return ( 
        <section className={style.mainSection}>
            <div className={style.container+' container'}>
                <article className={style.aboutUs}>
                    <h1 className={style.mainHeading+' TXT-heading2'}>About Us</h1>
                    <div className={style.firstText}>
                        <p className={style.text+' TXT-normal'}>this project is a demo project, that means: </p>
                        <ul className={style.list} role='list'>
                            <li className={style.text+' TXT-normal'}>you cannot buy anything</li>
                            <li className={style.text+' TXT-normal'}>you dont need to verify your email </li>
                        </ul>
                    </div>
                    <div className={style.secondText}>
                        <p className={style.text+' TXT-normal'}>used technology: </p>
                        <ul className={style.list} role='list'>
                            <li className={style.text+' TXT-normal'}>ReactJs</li>
                            <li className={style.text+' TXT-normal'}>NextJs</li>
                            <li className={style.text+' TXT-normal'}>Sanity</li>
                            <li className={style.text+' TXT-normal'}>Stripe</li>
                            <li className={style.text+' TXT-normal'}>firebase</li>
                            <li className={style.text+' TXT-normal'}>Figma</li>
                        </ul>
                    </div>
                    <div className={style.thirdtext}>
                        <p className={style.text+' TXT-normal'}>the point of this project is to show my skills as a 
                            frontend developer so if you are interested you can visit  
                        </p>
                        <a href="https://malikkajiji.online" target='_blank' rel="noopener noreferrer"><button className={style.Btn+' TXT-normal'}>My Portifolio</button></a>
                        <p className={style.text+' TXT-normal'}>
                            or contact me at<span> contact@malikkajiji.online</span>
                        </p>
                    </div>
                    <Link href='/'><button className={style.secondBtn+' BTN'}>go back to home page</button></Link>
                </article>
            </div>
        </section>
    );
}

export default Aboutus;