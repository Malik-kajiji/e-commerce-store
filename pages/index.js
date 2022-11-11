import Head from 'next/head'
import BestSales from '../components/BestSales'
import style from '../styles/pages/Home.module.css'
import { client } from '../lib/client'
import { urlFor } from '../lib/client'
import Link from 'next/link'


export const getServerSideProps = async ()=>{

  const bunner = '*[_type == "bunner"]';

  const bunnerData = await client.fetch(bunner);

  const BestSales = '*[_type == "bestsales"]';

  const BestSalesData = await client.fetch(BestSales);

  return {
    props:{bunnerData,BestSalesData}
  }

}
export default function Home({bunnerData,BestSalesData}) {

  const {date,event,name,image,price,slug}=bunnerData[0];

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <article className={style.landing}>
        <div className={style.txt+' container'}>
          <h1 className={style.heading + ' TXT-heading'}>gaming store</h1>
          <p className={style.pragraph + ' TXT-normal'}>Lorem ipsum dolor si t amet consectetur Consectetur quo veniam dolorum dolor,  exercitationem possimus officia quia Fugiat facilis assumenda deleniti.</p>
        </div>
      </article>
      <section className={style.mainContent}>
        <article className='container'>
          <div className={style.heading2+' TXT-heading2'}>BEST SALES</div>
          <BestSales BestSalesData={BestSalesData} />
          <article className={style.bunner}>
            <img className={style.image} src={urlFor(image[0])} alt="" />
            <span className={style.bunnerHeading+' TXT-heading2'}>{name}</span>
            <div className={style.first}>
              <p className={style.event+' TXT-heading3'}>{event}</p>
              <span className={style.price+' TXT-heading3'}>${price}</span>
            </div>
            <div className={style.second}>
              <p className={style.date+' TXT-normal'}>{date}</p>
              <Link href={`/Categories/Bunner/${slug.current}`}>
                <button className={style.btn+' BTN'}>view</button>
              </Link>
            </div>
          </article>
        </article>
      </section>
    </>
  )
}
