import '../styles/globals.css'
import Layout from '../components/Layout'
import CartContext from '../context/CartContext'

function MyApp({ Component, pageProps }) {
  return (
    <CartContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext>
  )
}

export default MyApp
