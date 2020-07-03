import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';


const ManageProducts = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [desctiption, setDescription] = useState('');

    // Get product list
    const productList = useSelector(state => state.productList);
    const {products, loading, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error:errorSave} = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const {loading: loadingDelete,success: successDelete,error: errorDelete,} = productDelete;


    const dispatch = useDispatch();

    useEffect( () => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return ()=> {

        };
    }, [dispatch,successSave, successDelete] ); 

    // Submit
    const submitHandler = (e)=> {
        e.preventDefault();

        dispatch(saveProduct({_id:id, name, img, brand, category, price, countInStock, desctiption} ));
    };

    // Delete item
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };


    // show/hide    +  if Edit put product data in inputs
    const openModal = (product) => {
        setModalVisible(true);

        setId(product._id)
        setName(product.name)
        setImg(product.img)
        setBrand(product.brand)
        setCategory(product.category)
        setPrice(product.price)
        setCountInStock(product.countInStock)
        setDescription(product.desctiption)
    }

    return (

        <div className="content-wraper">
            <div className="note">this page is for admin to manage(create/edit/delete) product list. 
            regular user can only add product to the datebase
            </div>
            <div className="product-header">
                <h3>Products</h3>
                <button onClick={ () => openModal({})} className="primary" >Create Product</button>
            </div>

            { modalVisible &&
                <div className="form">
                <form onSubmit={submitHandler}>
                    <div className="form-container">
                    <h2>Create Product</h2>

                        {loadingSave && <div>Loading..</div>}
                        {errorSave && <div>Please enter valid email and password.</div>}

                        <label htmlFor="name">name</label>
                        <input type="text" value={name} name="name" id="name" onChange={e => setName(e.target.value)} /> 

                        <label htmlFor="img">image</label>
                        <input type="text" value={img} name="img" id="img" onChange={e => setImg(e.target.value)} />

                        <label htmlFor="brand">brand</label>
                        <input type="text" value={brand} name="brand" id="brand" onChange={e => setBrand(e.target.value)} />

                        <label htmlFor="category">category</label>
                        <input type="text" value={category} name="category" id="category" onChange={e => setCategory(e.target.value)} />

                        <label htmlFor="price">price</label>
                        <input type="text" value={price} name="price" id="price" onChange={e => setPrice(e.target.value)} />

                        <label htmlFor="countInStock">count In Stock</label>
                        <input type="text" value={countInStock} name="countInStock" id="countInStock" onChange={e => setCountInStock(e.target.value)} />

                        <label htmlFor="desctiption">desctiption</label>
                        <textarea name="desctiption" value={desctiption} id="desctiption" onChange={e => setDescription(e.target.value)} />


                        <button type="submit" className="primary">
                            {id? 'Update' : 'Add Item'}
                        </button>

                        <button type="submit" onClick={()=> setModalVisible(false)} className="secondary">
                            Back
                        </button>

                    </div>
                </form>
            </div>
            }

            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products && products.map( product => (
                            <tr key={product._id} >
                                
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button onClick={()=> openModal(product)} className="primary">Edit</button>
                                    {' '}
                                    <button onClick={()=> deleteHandler(product)} className="secondary" >Delete</button>
                                </td>
                            </tr>
                        ) )}
                    
                    </tbody>
                    
                </table>

            </div>

        </div>

        
    )
}

export default ManageProducts;