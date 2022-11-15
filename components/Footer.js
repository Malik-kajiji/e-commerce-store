import React from "react";
import Cart from "./Cart";

const Footer = ({showCart,handleCart}) => {
    function handleCopy(){
        const copyMsg = document.querySelector('.copy');
        navigator.clipboard.writeText("contact@malikkajiji.online");
        copyMsg.innerHTML = "copied";
        setTimeout(() => {
            copyMsg.innerHTML = "copy";
        }, 3000);
    }
    return ( 
        <footer>
            <div className="container">
                <article>
                    <img className="logo" src='/logo.png' />
                    <p className="TXT-footer">e-commerce site</p>
                    <p className="TXT-footer">developed & designed by malik kajiji </p>
                </article>
                <article>
                    <p className="email TXT-footer" onClick={handleCopy}>contact@malikkajiji.online</p>
                    <p className='copy TXT-normal'> copy </p>
                    <p className="TXT-footer">for more details about me you can visit </p>
                    <a href="https://malikkajiji.online" target='_blank' rel="noopener noreferrer"><button className="TXT-footer">my portifolio</button></a>
                </article>
            </div>
            <Cart showCart={showCart} handleCart={handleCart}/>
        </footer>   
    );
}

export default Footer;