import React, { useState } from "react";
import Link from 'next/link';
import { FiUser,FiShoppingCart } from 'react-icons/fi';

const Header = ({handleCart}) => {
    const [showNav,setShowNav] = useState(false);
    return ( 
        <header>
            <div className="container">
                <img className="logo" src='/logo.png' />
                <nav className={`navigation ${showNav?'show': ''}`}>
                    <Link href='/'><a className="TXT-heading3">home</a></Link>
                    <Link href='/Categories'><a className="TXT-heading3">Categories</a></Link>
                    <Link href='/aboutus'><a className="TXT-heading3">aboutus</a></Link>
                    <Link href='/account'><a className="TXT-heading3">{FiUser()}</a></Link>
                    <button onClick={handleCart} className="cart TXT-heading3">{FiShoppingCart()}</button>
                </nav>
                <button onClick={()=>setShowNav(prev=>!prev)} className={`menu ${showNav?'show': ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}

export default Header;