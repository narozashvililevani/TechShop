const express = require('express');
const Product = require('../models/productM');
const {isAuth, isAdmin} = require('../utils')
const router = express.Router();

// get all product
router.get('/', async (req, res) => {
    
    const searchKeyword = req.query.searchKeyword ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
    } : {};
    const sortOrder = req.query.sortOrder ? 
        req.query.sortOrder === 'lowest'? { price: 1 } : { price: -1 } : { _id: -1 };
        res.send({"test": "test"});
        return; 
    const products = await Product.find({ ...searchKeyword }).sort(
        sortOrder
    );
  
  res.send(products);
});



// get product with ID
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({_id: productId});
        if(product) {
            res.status(200).send(product)
        }
        res.send(products);   
    } catch (error) {
        res.status(404).send({msg: 'product not found'})
    }
});

// Create product ( without isAdmin )
router.post("/", isAuth, async (req, res) => {

   try {
    const product = new Product({
        name: req.body.name,
        img: req.body.img,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock,
        desctiption: req.body.desctiption
    });
    const newProduct = await product.save();
    
    if(newProduct) {
       return res.status(201).send({message: 'new product created', data: newProduct});
    }
   
   } catch (error) {
        return res.status(500).send({message: 'Couldnt create product'});
   }
});

// Edit product
router.put("/:id", isAuth, isAdmin,  async (req, res) => {
    
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            product.name = req.body.name,
            product.img = req.body.img,
            product.brand = req.body.brand,
            product.category = req.body.category,
            product.price = req.body.price,
            product.rating = req.body.rating,
            product.numReviews = req.body.numReviews,
            product.countInStock = req.body.countInStock,
            product.desctiption = req.body.desctiption

            const updatedProduct = await product.save();
        
            if(updatedProduct) {
                return res.status(200).send({message: 'product updated!', data: updatedProduct});
            }
        }
        
    } catch (error) {
         return res.status(500).send({message: 'Couldnt Update product'});
    }
 });

// Delete product
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findById(productId);
        if(deletedProduct) {
            await deletedProduct.remove();
            res.status(204).send({message: "item deleted!"})
        }
    } catch (error) {
        res.send({message: "error in deletion!"})
    }
});


module.exports = router;