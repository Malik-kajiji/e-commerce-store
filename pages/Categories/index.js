import React from "react";
import style from '../../styles/pages/categories.module.css'
import BestSales from '../../components/BestSales'
import Link from 'next/link'
import {client}from '../../lib/client'


export const getServerSideProps = async ()=>{

    const bestsales = '*[_type == "bestsales"]'

    const BestSalesData = await client.fetch(bestsales)

    return {
        props:{BestSalesData}
    }
    
}



const Categories = ({BestSalesData}) => {
    return ( 
        <section className={style.container}>
            <div className="container">
                <h1 className={style.mainHeading+' TXT-heading2'}>Categories</h1>
                <article className={style.categories}>
                    <Link href={'/Categories/keyboards'}>
                        <div className={style.category}>
                            <img className={style.image} src="/keyboards.png" alt="" />
                            <span className={style.title+ ' TXT-heading3'}>keyboards</span>
                        </div>
                    </Link>
                    <Link href={'/Categories/mouses'}>
                        <div className={style.category}>
                            <img className={style.image} src="/mouse.png" alt="" />
                            <span className={style.title+ ' TXT-heading3'}>mouses</span>
                        </div>
                    </Link>
                    <Link href={'/Categories/headphones'}>
                        <div className={style.category}>
                            <img className={style.image} src="/headphones.png" alt="" />
                            <span className={style.title+ ' TXT-heading3'}>headphones</span>
                        </div>
                    </Link>
                    <Link href={'/Categories/monitors'}>
                        <div className={style.monitors}>
                            <img className={style.image} src="/monitor.png" alt="" />
                            <span className={style.title+ ' TXT-heading3'}>monitors</span>
                        </div>
                    </Link>
                </article>
                <div className={style.heading2+' TXT-heading2'}>BEST SALES</div>
                <BestSales BestSalesData={BestSalesData} />
            </div>
        </section>
    );
}

export default Categories;