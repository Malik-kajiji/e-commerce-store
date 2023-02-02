import '../styles/globals.css'
import Layout from '../components/Layout'
import AppContext from '../context/AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </AppContext>
  )
}

export default MyApp
