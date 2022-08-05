import { useQuery } from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query"
import {useRouter} from "next/router"
import { 
    DetailedStyle,
    ProductInfo, 
    Quantity, 
    Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast"
import { useEffect } from "react";
import { CircularProgress   } from "@mui/material";


export default function ProductDetails(){

    const {query} = useRouter();
    const {qty,increaseQty,decreaseQty,cartItems,onAdd,setQty}  = useStateContext();
    useEffect(() =>  {
        setQty(1)
    },[])
    // Fetch graphql data

    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug : query.slug},
    })
    const {data,fetching,error} = results; 

    if(fetching) return <CircularProgress/>;
    if(error) return <p>Oh no...{error.message}</p>

    const {title, description,image} = data.products.data[0].attributes;

    // create a toast
    const notify = () => {
        toast.success(`${title} added to your cart`)
    }
    return(
        <DetailedStyle>
            <img src={image.data.attributes.formats.medium.url} alt={title} />
            <ProductInfo> 
                <h3>{title}</h3>
                <p>{description}</p>
            
                <Quantity>
                    <span>Quantity</span>
                    <button><AiFillMinusCircle onClick={decreaseQty}/></button>
                    <p>{qty}</p>
                    <button><AiFillPlusCircle onClick={increaseQty}/></button>
                </Quantity>
            <Buy onClick={()=> {
                onAdd(data.products.data[0].attributes,qty);
                notify();
            }}>Add to cart</Buy>
            </ProductInfo>
        </DetailedStyle>
    )
}