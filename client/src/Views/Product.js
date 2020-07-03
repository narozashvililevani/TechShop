import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { detailsProduct } from '../actions/productActions';
import Rating from '../ratingL';

const Product = (props) => {

    const [qty, setQty] = useState(1);

    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, err} = productDetails;
    
    const dispatch = useDispatch();

    // Get product detail
    useEffect( () => {
    
        dispatch(detailsProduct(props.match.params.id)); 

        return () => {
            // clnup
        };
    }, [dispatch, props.match.params.id]);  

    // Go to  Cart Screen >
    const addToCartHandler = () => {
        //  browser redirect > 
        props.history.push("/cart/" +  props.match.params.id + "?qty=" + qty);
    };

    return (

        <div>
            <div className="back btn">
                <Link to="/" > &#8602; Back	</Link>
            </div>
            
           { loading ? <div>loading...</div> :
            err ? <div>{err}</div> :

            <div className="details">
                <div className="details-img">
                    <img src={product.img}  alt="item"/>
                </div>

                <div className="details-info">
                  
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            <Rating
                                    value={product.rating}
                                    text={product.numReviews + ' reviews'}
                            />
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>

                        <li>category: {product.category}</li>

                        <li>brand: {product.brand}</li>
                        
                        <li>
                            Description:
                            <div>
                                {product.desctiption}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="details-action">
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </li>
                        <li>
                            Qty: <select value={qty} onChange={ (e) => setQty(e.target.value)}>
                               {[...Array(product.countInStock).keys()].map( i =>  
                                    <option  key={i+1} value={i+1} >{i+1}</option>
                                 ) }
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 &&  <button className="add-to-cart" onClick={addToCartHandler}>
                                Add to Cart</button> }
                            
                        </li>
                    </ul>
                </div>
            </div>
            }

            

            <div>

            </div>
        </div>
    )
}

export default Product;
