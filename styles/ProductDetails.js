import styled from "styled-components";

 const media = {
    desktop: '@media(min-width: 1000px)',
}

export const DetailedStyle = styled.div`
    /* margin-top: 5rem;
    display:flex;
    justify-content:space-between;
    img{
    width:40%;
    }
     */
    width: 100%;
    display:flex;
    flex-flow:column nowrap;
    justify-content:center;
    align-items:center;
    ${media.desktop}{
        display:flex;
        flex-flow: row nowrap;
        align-items:center;
        justify-content: space-between;
    }

    img{
        width:100%;
        margin-bottom: 2rem;
        ${media.desktop}{  
            width:40%;
            margin-bottom: 0rem;
         }
    }

`;

export const ProductInfo = styled.div`
    
    width: 100%;
    button{
        font-size: 1rem;
        font-weight: medium;
        padding: 0.5rem 1rem;
        cursor:pointer;
        margin-bottom: 0.5rem;
    }
    ${media.desktop}{
        width:40%;
    }
`;

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
`;

export const Buy = styled.button`
    width: 100%;
    background: var(--primary);
    color:white;
    font-weight: 500;
`;