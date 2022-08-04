import { useRouter } from "next/router"
import Image from "next/image"
import shiba from "../public/shiba.png"
import styled from "styled-components";

const { motion } = require("framer-motion");

const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST}`);
export async function getServerSideProps(params){
    const order = await stripe.checkout.sessions.retrieve(
        params.query.session_id,
        {
            expand: ['line_items']
        }
    );
return {props: {order}}
}

export default function Success({order}){
    console.log(order)
    const route = useRouter()
    return (
   <Wrapper>
        <Card>
            <h1> Thank you for the order! </h1>
            <h2> A confirmation email has been sent to</h2>
            <h2> {order.customer_details.email} </h2>
            <InfoWrapper>
            <Address>
                <h3> Address </h3>
                {Object.entries(order.customer_details.address).map(
                    ([key, val]) => (
                        <p key={key}> {key} : {val} </p>
                    )
                )}
            </Address>
            <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹ {item.price.unit_amount/100}/unit</p>
              </div>
            ))}
            
          </OrderInfo>
            </InfoWrapper>
            <button onClick={() => route.push('/')}> Continue Shopping</button>
             <Image src={shiba} alt="shiba-inu"/>
        </Card>
   </Wrapper>
    )
}

const Wrapper = styled.div`
    margin:  0rem 10rem;
    
`;

const Card = styled(motion.div)`
    display:flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 2rem;
    padding: 0rem 3rem; 
    button{
        color: white;
        background: var(--primary);
        font-size: 1.2rem;
        font-weight: 500;
        padding: 1rem 2rem;
        cursor: pointer;
    }
    h1 {
    color: var(--primary);
    margin-bottom: 1rem;
    }
    h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;

const Address = styled.div`
    font-size: 1rem;
    width: 100%;
`;
 
const OrderInfo = styled.div`
    font-size: 1rem;
    margin-left: 2rem;
    width: 100%;
    div{
        padding-bottom: 1rem
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    margin: 2rem ;
`;