require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Veggies_DB?directConnection=true';

// Middleware

app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Allow cross-origin requests from your frontend

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth.js');


// Mount auth routes
app.use('/api/auth', authRoutes);

// Define Product Schema and Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  category: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Veggies_Product', productSchema);

// 1. Add Product (POST /api/products)
app.post('/api/products', async (req, res) => {
    try {
      const { name, description, price, imageUrl, category } = req.body;
      const newProduct = new Product({ name, description, price, imageUrl, category });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Failed to add product', details: err.message });
    }
  });
  
  // 2. Get All Products (GET /api/products)
  app.get('/api/products/', async (req, res) => {
    try {
      // const products = await Product.find();
      // res.status(200).json(products);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const products = await Product.find();
        const paginatedProducts = products.slice(startIndex, endIndex);

        const totalProducts = products.length;
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
          products: paginatedProducts,
          currentPage: page,
          totalPages: totalPages,
          totalProducts: totalProducts,
          limit: limit,
        });

    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
  });

   //3. Get Product by Particular ID
   app.get('/api/products/:productId', async(req,res) => {
    try{
            const {productId} = req.params;
            if(mongoose.Types.ObjectId.isValid(productId)){
                try{
                    const product = await Product.findById(productId);
                    if(!product){
                       return res.status(400).json({error : 'No Product Found against the ID'});
                        }
                    return res.status(200).json(product);
                    }catch(err){
                        return res.status(500).json({error : 'Please provide valid Product ID'});
                    }
                }
        }catch (err){
            return res.status(500).json({error: 'Failed to Fetch Product', details: err.message});
        }
  });

  //2.1 Get Product by Category

  app.get('/api/products/category/:activeFilter', async(req,res) => {
    try{
        const {activeFilter} = req.params;
        const products = await Product.find({category : activeFilter});
        if(products){
          res.status(200).json(products);
        }else{
          res.status(400).json({error : 'No Product Found against this catgeory.'})
        }
      }catch (err) {
          res.status(500).json({error : 'Category Not Found.' , details: err.message})
      }
  });

 
  
  // Start the server
  app.listen(PORT, () => {
 
    console.log(`Server running on port ${PORT}`);
  });