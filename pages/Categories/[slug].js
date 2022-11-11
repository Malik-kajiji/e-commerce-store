import React from "react";
import style from '../../styles/pages/products.module.css'
import Link from 'next/link'
import { urlFor,client } from "../../lib/client";


export const getServerSideProps = async ({params:{slug}})=>{

    const products = `*[_type == "${slug}"]`;

    const productsData = await client.fetch(products);

    return {
        props:{productsData}
    }
}


export default function Products({productsData}){

    return ( 
        <section className={style.mainSection}>
            <div className="container">
                <h1 className={style.mainHeading+' TXT-heading2'}>keyboards</h1>
                <article className={style.products}>
                    {/*  */}
                    {productsData.map(product=>{
                        const {slug,image,name,details,price}=product;
                        return (
                            <div className={style.product} key={slug.current}>
                                <img className={style.image} src={urlFor(image[0])} alt="" />
                                <div className={style.text}>
                                    <h2 className={style.title+' TXT-heading3'}>{name}</h2>
                                    <p className={style.details+' TXT-normal'}>
                                        {details}
                                    </p>
                                </div>
                                <Link href={`/Categories/product/${slug.current}`}>
                                    <button className={style.viewBtn+' BTN'}>
                                        view
                                    </button>
                                </Link>
                                <span className={style.price+' TXT-heading3'}>${price}</span>
                            </div>
                        )
                    })}
                </article>
            </div>
        </section>
    );
}
