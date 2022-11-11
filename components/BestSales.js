import React, { useEffect, useState } from "react";
import {BiRightArrow}from 'react-icons/bi'
import {urlFor}from '../lib/client'
import  Link from 'next/link'


const BestSales = ({BestSalesData}) => {
    const [current,setCurrent]=useState(0);
    const [timer,setTimer]=useState()
    useEffect(()=>{
    clearTimeout(timer)
        const TimeOut = setTimeout(() => {
            if(current == BestSalesData.length-1){
                    setCurrent(0);
                } else {
                    setCurrent(prev=>prev+1);
                }
        }, 3000);
        setTimer(TimeOut)
    },[current])
    function inc(){
        if(current == BestSalesData.length-1){
            setCurrent(0);
        }else {
            setCurrent(prev=>prev+1);
        }
    }
    function dec(){
        if(current == 0){
            setCurrent(BestSalesData.length-1);
        }else {
            setCurrent(prev=>prev-1);
        }
    }
    return (
        <article className="best-sales">
            <button className="next-btn" onClick={inc}>{BiRightArrow()}</button>
            <div className="items">
                <div className="content" style={{'--i':current}}>
                    {BestSalesData.map(item=>{
                        const {image,name,prerprice:prevprice,price,slug}=item;
                        return (
                            <div className="item" key={slug.current}>
                                <img className="img-background" src={urlFor(image[0])} alt="" />
                                <div className="price">
                                    <img src={urlFor(image[0])} alt="" />
                                    <span className="prev-price TXT-heading3">${prevprice}</span>
                                    <span className="current-price TXT-heading2">${price}</span>
                                </div>
                                <div className="text">
                                    <span className="TXT-heading3">{name}</span>
                                    <Link href={`/Categories/BestSales/${slug.current}`}>
                                        <button className="BTN">view</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button className="prev-btn" onClick={dec}>{BiRightArrow()}</button>
        </article>
    );
}

export default BestSales;