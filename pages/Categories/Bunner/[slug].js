import React, { useEffect, useState } from "react";
import { client,urlFor } from  "../../../lib/client";
import style from '../../../styles/pages/product.module.css';
import { AppData } from "../../../context/AppContext";
import { useRouter } from 'next/router';
import { doc,setDoc } from 'firebase/firestore';
import { initFirebase } from "../../../lib/fireaseConfig";

export const getServerSideProps = async ({params:{slug}})=>{
    const product = `*[_type == "bunner" && slug.current == '${slug}'][0]`;

    const productData = await client.fetch(product)

    return {
        props:{productData}
    }
}

const Product = ({productData}) => {
    const {details,image,name,price,slug}=productData;
    const { isLoggedIn , user, cartItems  } = AppData()
    const [itemExists,setitemExists]=useState(false);
    const [popUp,setPopUp]=useState(null)
    const router = useRouter();
    const { db } = initFirebase();


    // to check if the product already exists
    useEffect(()=>{
            const itemExistsSetter = cartItems.filter(product=>product.slug.current === slug.current);
            if(itemExistsSetter.length === 1){
                setitemExists(true)
            }else {
                setitemExists(false)
            }
    },[cartItems.length])



    function handleAdd(){
        if(!isLoggedIn){
            setPopUp('you must login first')
        }else {
            const itemsRef = doc(db,'cartitems', user.uid);
            const newProduct = {
                name,
                slug,
                image,
                details,
                qty:1,
                price,
                totalPrice:price
            }
            setDoc(itemsRef,{items:[...cartItems,newProduct]})
            .then(()=>{
                
            })
            .catch((err)=>{
                setPopUp(err.message)
            })
        }
    }


    function handleDelete(){
        const newProductsArray = cartItems.filter(product =>  product.slug.current !== slug.current);
        const itemsRef = doc(db,'cartitems', user.uid);
        setDoc(itemsRef,{items:newProductsArray})
        .then(()=>{
            
        })
        .catch((err)=>{
            setPopUp(err.message)
        })
    }

    useEffect(()=>{
        if(popUp){
            setTimeout(() => {
                setPopUp(null)
            }, 3000);
        }
    },[popUp])

    return ( 
        <section className={style.mainSection}>
            <div className="container">
                {popUp && <p className={style.popUp+' TXT-footer'}>{popUp}</p>}
                <article className={style.product}>
                    <img className={style.image} src={urlFor(image[0])} alt="" />
                    <h2 className={style.mainHeading+' TXT-heading2'}>{name}</h2>
                    <p className={style.details+ ' TXT-normal'}>{details}</p>
                    <span className={style.price + ' TXT-heading2'}>
                        ${price}
                    </span>
                    {!itemExists ? <button onClick={handleAdd} className={style.Btn+' BTN'}>
                        add to cart
                    </button>
                    :
                    <button onClick={handleDelete} className={style.RemoveBtn+' TXT-heading3'}>
                        remove
                    </button>
                    }
                    <button onClick={router.back} className={style.Btn+' BTN'}>
                        Go back
                    </button>
                </article>
            </div>
        </section>
    );
}

export default Product;