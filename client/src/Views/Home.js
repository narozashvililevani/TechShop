import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../ratingL';

const Home = () => {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const productList = useSelector(state => state.productList);
    const { products, loading, err} = productList;

    const dispatch = useDispatch();

    // fetch data from server
    useEffect( () => {
    
        dispatch(listProducts());  // action

        return () => {
            // do something on cleanUp...
        };
    }, [dispatch]);  // run on C-DidMount


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts( searchKeyword, sortOrder));
      };

    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts( searchKeyword, sortOrder));
      };


    return ( 
    <>

        <ul className="filter">
            <li>
                <form onSubmit={submitHandler}>
                    <input
                    name="searchKeyword"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </li>

            <li>
                Sort By{' '}
                <select name="sortOrder" onChange={sortHandler}>
                    <option value="">Newest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </li>

            <li>
                <div className="amount">product found: {products&& products.length}</div>
            </li>
        </ul>

        
        
        {loading ? <div>Loading...</div> :
         err ? <div>{err}</div> :
            <ul className="products"> 
                {products.map( product => 
                    <li key={product._id}>
                        <div className="product">
                            <Link to={"/product/" + product._id }  >
                                <img className="product-img" src={product.img} alt="itm" />
                            </Link>
                            <div className="product-name">
                                <Link to={"/product/" + product._id }  > {product.name} </Link>
                            </div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">
                                <Rating
                                    value={product.rating}
                                    text={product.numReviews + ' reviews'}
                                />
                                
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        }

    </>
    );
}

export default Home;
