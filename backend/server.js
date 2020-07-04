import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userR';
import productRoute from './routes/productR';
import path from 'path';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(process.env.MONGODB_URI || mongodbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).catch( e => console.log(e.reason));
 

// express
const app  = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoute );
app.use('/api/products', productRoute );

            // static  api
// app.get('/api/products', (req, res) => {
//     res.send(data.products)
// });

// app.get('/api/products/:id', (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find( p => p._id == productId);
    
//     if(product) {
//         res.send(product);
//     } else {
//         res.status(404).send( { msg: 'product not found'})
//     }
   
// });

//  heroku setup 
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname, 'client', 'build', 'index.html'));   // relative path
    }  );
}

app.listen(PORT, () =>  console.log(`server started on ${PORT}`) ); 