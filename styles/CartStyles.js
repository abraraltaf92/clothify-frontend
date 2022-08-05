import styled from "styled-components"

//Animations
const {motion} = require("framer-motion");
const media = {
    desktop: '@media(min-width: 1120px)',
    mobile: '@media(max-width: 450px)',
}

export const CartWrapper = styled(motion.div)`
    position: fixed;
    right: 0;
    top :0;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    /* display: none ;  */
`;


export const CartStyle = styled(motion.div)`
    width: 90%;
    background: #f1f1f1;
    padding: 2rem 5rem;
    overflow-y: scroll;
    position: relative;
    ${media.desktop}{
        width: 40%;
    }
`;

export const Card = styled(motion.div)`
    /* display: flex; */
    width: 80%;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    overflow: hidden;
    background:white;
    padding: 2rem;
    margin: 2rem 0rem;
    img{
        width: 8rem;
    }
    ${media.desktop}{
        display: flex;
        width: 100%;}
`;


export const CardInfo = styled(motion.div)`
    /* width: 50%; */
    div{
        display: flex;
        flex-direction: space-between;
    }
   
`;

export const EmptyStyle = styled(motion.div)`
    position: absolute;
    top: 0;
    transform: translate(-50%, 0%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80%;
    h1{
        font-size: 2rem;
        padding: 2rem;
    }
    svg{
        font-size: 10rem;
        color: var(--secondary);
    }
`;

export const Checkout = styled(motion.div)`
    button{
         background:var(--primary);
         padding: 1rem 2rem;
         width: 100%;
         color: white;
         margin-top: 2rem;
         cursor: pointer;
         border: none;
    }
`;

export const Cards = styled(motion.div)``

export const Quantity = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0rem;

    button {
        background:transparent;
        border:none;
        display:flex;
        font-size:1.5rem;
        padding: 0rem 0.5rem; 
        margin-bottom:0
    }
    p{
        width:1rem;
        text-align:center;
    }
    span{
        color: var(--secondary);
    }
    svg{
        color: #494949
    }

    ${media.mobile}{
        flex-flow: column nowrap;
    }
`;