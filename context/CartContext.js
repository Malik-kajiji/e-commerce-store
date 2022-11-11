import React, {useState,useEffect,useContext,createContext} from "react";

const Context = createContext()

const CartContext = ({children}) => {

    const [cartProducts,setCartProducts]=useState([]);
    const [account,setAccount] = useState('')

    useEffect(()=>{
        const prevProducts = localStorage.getItem('cartProducts');
        const prevAccount = localStorage.getItem('account')
        // if(prevProducts){
        //     setCartProducts(()=>JSON.parse(prevProducts));
        // }
        if(prevAccount){
            setAccount(prevAccount)
        }
    },[])

    return <Context.Provider
        value={{cartProducts,
                setCartProducts,
                account,
                setAccount
            }}
    >
        {children}
    </Context.Provider>;
}

export default CartContext;

export const CartData = ()=>useContext(Context)
