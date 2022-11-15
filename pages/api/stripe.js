const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
    try {
        const params = {
            submit_type : 'pay',
            payment_method_types:['card'],
            billing_address_collection:'auto',
            shipping_options:[
                {shipping_rate:'shr_1LtonPBBX2HY9ELq8K1TF9hQ'},
                {shipping_rate:'shr_1LtooHBBX2HY9ELqR0FuHo1Q'}
            ],
            line_items: JSON.parse(req.body).map((product)=>{
                const image = product.image[0].asset._ref;
                const newImage = image.replace('image-','https://cdn.sanity.io/images/her5qjl7/production/')
                .replace('-webp','.webp').replace('-png','.png');

                return {
                    price_data: {
                        currency: 'usd',
                        product_data:{
                            name:product.name,
                            images:[newImage],
                        },
                        unit_amount: product.price * 100,
                    },
                    adjustable_quantity: {
                        enabled:true,
                        minimum:1,
                    },
                    quantity:product.qty,
                }
            }),
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
            }
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
    } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    }
}