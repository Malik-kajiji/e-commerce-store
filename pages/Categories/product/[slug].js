import React, { useEffect, useState } from "react";
import { client,urlFor } from  "../../../lib/client";
import style from '../../../styles/pages/product.module.css';
import {CartData} from "../../../context/CartContext";
import { useRouter } from 'next/router';

export const getServerSideProps = async ({params:{slug}})=>{
    const Category = slug.slice(0,slug.length-1)
    const product = `*[_type == "${Category}s" && slug.current == '${slug}'][0]`;

    const productData = await client.fetch(product)

    return {
        props:{productData}
    }
}

const Product = ({productData}) => {
    const {details,image,name,price,slug}=productData;
    const products = CartData();
    const [itemExists,setitemExists]=useState(false);
    const [useEffectRunner,setUseEffectRunner]=useState(0)
    const {account}=CartData()
    const [popUp,setPopUp]=useState()
    const router = useRouter();

    // console.log(router.back)

    // to check if the product already exists
    useEffect(()=>{
        if(products.cartProducts.length){
            const itemExistsSetter = products.cartProducts.filter(product=>product.slug.current === slug.current);
            if(itemExistsSetter.length === 1){
                setitemExists(true)
            }else {
                setitemExists(false)
            }
        }
    },[products.cartProducts.length])



    function handleAdd(){
        if(account == ''){
            setPopUp('you must log in first')
        }else {
            setitemExists(prev=>!prev)
            products.setCartProducts(prev =>{
                if(!prev)prev=[]
                const newProduct = {
                    name,
                    slug,
                    image,
                    details,
                    qty:1,
                    price,
                    totalPrice:price
                }
                return [...prev,newProduct]
            })
            setUseEffectRunner(prev=>prev+1);
        }
    }


    function handleDelete(){
        setitemExists(prev=>!prev)
        products.setCartProducts(prev =>{
            return prev.filter(product => {
                return product.slug.current !== slug.current;
            })
        })
        setUseEffectRunner(prev=>prev+1);
    }

    useEffect(()=>{
            if(products.cartProducts && useEffectRunner!== 0){
                localStorage.setItem('cartProducts',JSON.stringify(products.cartProducts))
            }
    },[useEffectRunner])

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