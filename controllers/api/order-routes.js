const router = require('express').Router();
const { Order, Product, OrderProduct, User} = require('../../models');

// Get all the orders
router.get('/', async (req, res) => {

    try {
      const orderData = await Order.findAll({
        include: [ User, { model: Product, through: OrderProduct}]
      })

      console.log(orderData)

      if (orderData.length > 0) {
        let serializedOrders = orderData.map(orders => orders.get({plain:true}))

        console.log('--------Clean Data-------')
        console.log(serializedOrders)

        res.status(200).json(serializedOrders)
      } else {
        res.status(404).json({ message: 'No order found!'})
        return;
      }

    } catch (err) {
      res.status(500).json(err)
    }
  });

// Get a single order
router.get('/:id', async (req, res) => {
 
  try {
    const orderData = await Order.findByPk(req.params.id, {
      include: [ User, { model: Product, through: OrderProduct}]
      
    });
    console.log('------Raw Data------')
    console.log(orderData)

    if (!orderData) {
      res.status(404).json({ message: 'Order with the provided id does not exist!'})
      return
    }
    const order = orderData.get({plain:true})
    console.log('--------Clean Data-------')
    console.log(order)
    // res.render("order", order);
    
    res.status(200).json(order)
  } catch (err) {
    res.status(400).json(err)
  }
});

// Create new order
router.post('/neworder', async (req, res) => {
  try {
   

    
  } catch (err) {
    res.status(400).json(err);
  }  
});

// For fake payment
router.post('/payment', async (req, res) => {
  try {
    
    res.status(200).json({message: "Order Placed Successfully!"});

  } catch (err) {
    res.status(400).json(err);
  }  
});

// Delete the selected order
router.delete('/:id', async (req, res) => {

  try {
    const orderData = await Order.destroy({
    where: {
      id: req.params.id,
    }
  });
  if (!orderData) {
    res.status(404).json({ message: `Order number ${req.params.id} does not exist!`})
    return
  }
    res.status(200).json({ message: `Order number ${req.params.id} is successfully deleted!`})
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;