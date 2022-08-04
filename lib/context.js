import React , {createContext,useContext,useState} from 'react';

const ShopContext = createContext();

export const StateContext = ({children}) => {
    //Add the data from the state
    const [showCart,setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [qty,setQty] = useState(1);
    const [totalQty,setTotalQty] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);

    // Increase the qty
    const increaseQty = () => {
       setQty((prevQty) => prevQty + 1)
    };

    // Decrease the qty
    const decreaseQty = ()=>{
        setQty((prevQty) =>  {
            if (prevQty - 1 < 1) return 1;
             return prevQty -1 ;
        });
    };

    //Add product to cart

    const onAdd = (product,quantity) => {
        //increase total price

        setTotalPrice(preTotal => preTotal + product.price * quantity);
        // increase totalQuantity

        setTotalQty((preTotal) => preTotal + quantity);

        // check  if product is already in cart
        const exist = cartItems.find((item) => item.slug === product.slug);
        if  (exist) {
            setCartItems(cartItems.map(item => item.slug==product.slug ? {...exist,quantity: exist.quantity + quantity} : item));
        }
        else{
            setCartItems([...cartItems,{...product,quantity: quantity}]);
        }
    }
    // Remove Product from cart

    const onRemove = (product) => {
             //remove total price

             setTotalPrice(preTotal => preTotal - product.price );
         // decrease totalQuantity

        setTotalQty((preTotal) => preTotal -1);
         // check  if product is already in cart
         const exist = cartItems.find((item) => item.slug === product.slug);
         if(exist.quantity === 1) {
             setCartItems(cartItems.filter(item => item.slug !== product.slug));
         }
         else{
             setCartItems(
                cartItems.map((item) =>
                 item.slug === product.slug 
                 ? {...exist,quantity: exist.quantity - 1}
                 : item));
         }
    };

    return (
     <ShopContext.Provider value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQty,
        totalPrice,
        setQty
        }} >
        {children}
     </ShopContext.Provider>
    );
}

export const useStateContext = () => useContext(ShopContext);