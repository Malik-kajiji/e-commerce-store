import React, { useState } from 'react'
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
    const [showCart,setShowCart]=useState(false)
    function handleCart(){
        setShowCart(prev=>!prev)
    }
    return ( 
        <>
            <Header showCart={showCart} handleCart={handleCart}/>
                {children}
            <Footer showCart={showCart} handleCart={handleCart} />
        </>
    );
}

export default Layout;