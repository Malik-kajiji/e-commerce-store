import React from "react";
import Cart from "./Cart";

const Footer = ({showCart,handleCart}) => {
    return ( 
        <footer>
            <div className="container">
                <article>
                    <img className="logo" src='/logo.png' />
                    <p className="TXT-footer">e-commerce site</p>
                    <p className="TXT-footer">developed & designed by malik kajiji </p>
                </article>
                <article>
                    <p className="TXT-footer">contact@malikkajiji.online</p>
                    <p className="TXT-footer">for more details about me you can visit </p>
                    <a href="https://malikkajiji.online" target='_blank'><button className="TXT-footer">my portifolio</button></a>
                </article>
            </div>
            <Cart showCart={showCart} handleCart={handleCart}/>
        </footer>   
    );
}

export default Footer;