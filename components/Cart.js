import React  from "react";
import { urlFor } from "../lib/client";
import getStripe from "../lib/stripe";
import { initFirebase } from "../lib/fireaseConfig";
import { doc,setDoc } from 'firebase/firestore';
import { AppData } from "../context/AppContext";

const Cart = ({showCart,handleCart}) => {
    const { db } = initFirebase()
    const { cartItems ,user  } = AppData();

    const TotalItems = ()=>{
        const Total = 0;
        cartItems.forEach((product)=>Total+=product.qty)
        return Total;
    }

    const TotalPrice = ()=>{
        const Total = 0;
        cartItems.forEach((product)=>Total+=product.totalPrice)
        return Math.ceil(Total);
    }

    function clearCart(){
        const itemsRef = doc(db,'cartitems', user.uid);
        setDoc(itemsRef,{items:[]})
        .then(()=>{
        })
        .catch((err)=>{
        })
    }

    function handleInc(e){
        const slug = e.target.name;
        const newItems = cartItems.map((product)=>{
            if(product.slug.current !== slug)return product;
            return {
                ...product,
                qty:product.qty+1,
                totalPrice:product.totalPrice+product.price
            }
        })
        const itemsRef = doc(db,'cartitems', user.uid);
        setDoc(itemsRef,{items:newItems})
        .then(()=>{
        })
        .catch((err)=>{
        })
    }

    function handleDec(e){
        const slug = e.target.name;
        const newItems = cartItems.map((product)=>{
            if(product.slug.current !== slug)return product;
            if(product.qty == 1)return product;
            return {
                ...product,
                qty:product.qty-1,
                totalPrice:product.totalPrice-product.price
            }
        })
        const itemsRef = doc(db,'cartitems', user.uid);
        setDoc(itemsRef,{items:newItems})
        .then(()=>{
        })
        .catch((err)=>{
        })
    }

    function handleRemove(e){
        const slug = e.target.name;
        const newItems = cartItems.filter((product)=> product.slug.current !== slug)

        const itemsRef = doc(db,'cartitems', user.uid);
        setDoc(itemsRef,{items:newItems})
        .then(()=>{
        })
        .catch((err)=>{
        })
    }

    const handleCheckout = async ()=>{
        const stripe = await getStripe();
        const res = await fetch('/api/stripe',{
            method:'POST',
            headers: {
                'Content-type':'apalication/json',
            },
            body:JSON.stringify(cartItems)
        })
        if(res.statusCode == 500)return;
        const data = await res.json()
        stripe.redirectToCheckout({sessionId: data.id});
    }
    return ( 
        <>
            <div className={`overlay ${showCart?'show':''}`}></div>
            <section className={`cart ${showCart?'show':''}`}>
                    <nav className="cart-navigation container">
                        <h1 className="TXT-heading3">CART</h1>
                        <button onClick={handleCart} className="close-cart">
                            <span></span>
                            <span></span>
                        </button>
                    </nav>
                    <article className="products container">
                        {cartItems.map((product)=>{
                            const {details,image,name,price,qty,slug,totalPrice} = product;
                            return (
                                <article className="product" key={slug.current}>
                                    <img src={urlFor(image[0])} alt="" />
                                    <h1 className="TXT-heading3">{name}</h1>
                                    <p className="TXT-normal">{details}</p>
                                    <div className="price">
                                        <div className="quantity">
                                            <button className="dec TXT-normal"
                                                    name={slug.current}
                                                    onClick={(e)=>handleDec(e)}
                                                    >-
                                                    </button>
                                            <h1 className="TXT-heading3">{qty}</h1>
                                            <button className="inc TXT-normal" 
                                                name={slug.current}
                                                onClick={(e)=>handleInc(e)}>
                                                +
                                                </button>
                                        </div>
                                        <h1 className="TXT-heading2">${Math.floor(totalPrice)}</h1>
                                    </div>
                                    <button className="remove-btn TXT-heading3" 
                                        name={slug.current}
                                        onClick={(e)=>handleRemove(e)}
                                        >remove
                                    </button>
                                </article>
                            )
                        })}
                    </article>
                <article className="price-details">
                    <div className="container">
                        <article className="details">
                            <p className="TXT-heading3">total items = {TotalItems()}</p>
                            <p className="TXT-heading3">total price = ${TotalPrice()}</p>
                        </article>
                        <article className="Btns">
                            <button className="clear-btn" onClick={clearCart}>clear cart</button>
                            <button className="BTN" onClick={handleCheckout}>continue payment</button>
                        </article>
                    </div>
                </article>
            </section>
        </>
    );
}

export default Cart;