import Link from "next/link";
import {FiShoppingBag} from "react-icons/fi";
import { NavStyles,NavItems } from "../styles/NavStyles";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
import User from "./User";
import {useUser} from "@auth0/nextjs-auth0"
const {AnimatePresence,motion}  = require("framer-motion");


export default function Nav() {
    const {showCart,setShowCart,totalQty} = useStateContext();
    return(
        <NavStyles>
        <Link href="/"> Clothify.</Link>
        <NavItems>
            <User/>
            <div onClick={()=> setShowCart(true)}>
                 {totalQty > 0 && <motion.span animate={{scale:1}} initial={{scale:0}}>{totalQty}</motion.span>}
                <FiShoppingBag/>
                <h3>Cart</h3>
            </div>
        </NavItems>
        <AnimatePresence>
        {showCart && <Cart />}
        </AnimatePresence>
        
    </NavStyles>
    );
}   
