const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const storeItems = new Map([
    [1, { priceInCents: 130000, name: "iPhone 13" }],
    [2, { priceInCents: 15000, name: "Ray-Ban Sunglasses" }],
])
  
router.post("/", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id)
            return {
            price_data: {
                currency: "usd",
                product_data: {
                name: storeItem.name,
                },
                unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
            }
        }),
        success_url: `${process.env.HOME_URL}/success`,
        cancel_url: `${process.env.HOME_URL}/cartitems`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = router