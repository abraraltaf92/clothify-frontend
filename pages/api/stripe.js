import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res){
    const session = getSession(req,res);
    const user = session?.user;

    if(user){

    const stripeId = user[`${process.env.AUTH0_BASE_URL}/stripe_customer_id`] ;
    if(req.method === 'POST'){
       try{
                // create Session 

                const session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    payment_method_types: [],
                    shipping_address_collection:{
                        allowed_countries: ['IN']
                    },
                    customer: stripeId,
                    shipping_options: [
                        {shipping_rate: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_SHIPPING_RATE},
                        {shipping_rate: process.env.NEXT_PUBLIC_STRIPE_REGULAR_SHIPPING_RATE}
                        
                    ],
                    allow_promotion_codes:true,
                    line_items: req.body.map(item => {
                        return{
                            price_data:{
                                currency: 'inr',
                                product_data:{
                                    name: item.title,
                                    images: [item.image.data.attributes.formats.thumbnail.url]
                                },
                                unit_amount: item.price * 100,
                            },
                            quantity: item.quantity,
                            adjustable_quantity:{
                                enabled: true,
                                minimum: 1
                            }
                        }
                    }),
                    success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/cancelled`,
                    

                })
                res.status(200).json(session);
       }catch(err){
        res.status(error.statusCode || 500).json(error.message);
       }
    }else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
        }
    } else{


        if (req.method === "POST") {
          try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
              submit_type: "pay",
              mode: "payment",
              payment_method_types: ["card"],
              shipping_address_collection: {
                allowed_countries: ["IN"],
              },
    
              allow_promotion_codes: true,
              shipping_options: [
                {shipping_rate: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_SHIPPING_RATE},
                {shipping_rate: process.env.NEXT_PUBLIC_STRIPE_REGULAR_SHIPPING_RATE}
            ],
              line_items: req.body.map((item) => {
                return {
                  price_data: {
                    currency: "inr",
                    product_data: {
                      name: item.title,
                      images: [item.image.data.attributes.formats.thumbnail.url],
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                  },
                  quantity: item.quantity,
                };
              }),
              success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${req.headers.origin}/cancelled`,
            });
            res.status(200).json(session);
          } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
          }
        } else {
          res.setHeader("Allow", "POST");
          res.status(405).end("Method Not Allowed");
        }
      }
}