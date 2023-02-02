import React, {useState,useEffect,useContext,createContext} from "react";
import { initFirebase } from '../lib/fireaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';


const Context = createContext();
const AppContext = ({children})=>{
    const { auth,db  } = initFirebase();
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [user,setUser]=useState(null);
    const [cartItems,setCartItems] = useState([]);
    useEffect(()=>{
        const removeStateChanged = onAuthStateChanged(auth,(user)=>{
            if(user === null) {
                setUser(null)
                setIsLoggedIn(false)
                setCartItems([])
            } else {
                setUser(user)
                setIsLoggedIn(true)
            }
        })
        return () => removeStateChanged()
    },[])

    useEffect(()=>{
        if(isLoggedIn){
            const itemsRef = doc(db,'cartitems', user.uid);
            onSnapshot(itemsRef,(res)=>{
                const  cartItems  = res.data()
                if(res.exists()){
                    if(cartItems?.items.length > 0){
                        setCartItems(cartItems.items)
                    } else {
                        setCartItems([])
                    }
                } else {
                    setCartItems([])
                }
            })
        } 
    },[isLoggedIn])
    return <Context.Provider
        value={{
            isLoggedIn,
            user,
            cartItems
        }}
    >
        {children}
    </Context.Provider>
}

export default AppContext;

export const AppData = () => useContext(Context)