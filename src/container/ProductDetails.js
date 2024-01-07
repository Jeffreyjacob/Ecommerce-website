import React from 'react';
import './productDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductDetail } from '../features/productDetailSlice';
import { useNavigate } from 'react-router-dom';
import ProductDetailQuantity from '../components/ProductDetailQuantity';
import { SelectQuantity, quantityReset } from '../features/QuantitySlice';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import Footer from '../components/Footer';



function ProductDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectCount = useSelector(SelectQuantity)
    const selectedProduct = useSelector(selectProductDetail)
    const backBtn = () => {
        navigate('/')
        dispatch(quantityReset())
    }
    const AddToCart = () => {
        db.collection('cart').add({
            image: selectedProduct?.products.image.src,
            title: selectedProduct.products.title,
            price: selectedProduct.products.variants[0].price,
            quantity: selectCount,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()

        })
    }
    return (
        <div className='productDetails'>
            <div className='ProductDetail___backbutton'>
                <button className='btn' type='button' onClick={backBtn}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </div>

            <div className='productDetail__content container-fluid row mt-5' >
                <div className='col-md-7 col-12 px-md-4 px-3 d-flex justify-content-center'>
                    <img src={selectedProduct?.products.image.src} className='ProductDetail__image' />
                </div>
                <div className='productDetail__briefDesc col-md-5 col-12 mt-md-0 mt-4 px-md-1 px-3 '>
                    <h4>{selectedProduct.products.title}</h4>
                    <p>
                        Vendor:<span>
                            {selectedProduct.products.vendor}
                        </span>
                    </p>
                    <p>
                        SKU: <span>
                            {selectedProduct.products.variants[0].sku}
                        </span>
                    </p>
                    <p>
                        Product Type: <span>
                            {selectedProduct.products.product_type}
                        </span>
                    </p>
                    <h5>${selectedProduct.products.variants[0].price}</h5>
                    <p className='productDetail__color d-flex flex-column'> Color: <span >
                        {selectedProduct.products.options[0].values[0]}
                    </span>
                        <span >
                            {selectedProduct.products.options[0].values[1]}
                        </span>
                        <span>
                            {selectedProduct.products.options[0].values[2]}
                        </span>
                        <span className='productDetail__color'>
                            {selectedProduct.products.options[0].values[3]}
                        </span>
                    </p>
                    <p>
                        Size: <div className='d-flex'>
                            <div className='size'>
                                {selectedProduct.products.options[1]?.values[0]}
                            </div>
                            <div className='size'>
                                {selectedProduct.products.options[1]?.values[1]}
                            </div>
                            <div className='size'>
                                {selectedProduct.products.options[1]?.values[2]}
                            </div>
                            <div className='size'>
                                {selectedProduct.products.options[1]?.values[3]}
                            </div>
                        </div>
                    </p>
                    <p> Quantity:
                        <div style={{ fontWeight: "400" }}>
                            <ProductDetailQuantity
                                count={selectCount}
                                price={selectedProduct.products.variants[0].price} />
                        </div>

                    </p>
                    <div>
                        <button type='button' onClick={AddToCart} className='addtocart btn btn-dark w-75 my-3' >
                            ADD TO CART
                        </button>
                    </div>

                    <div className='shipping__section mt-4'>
                        <div className='shipping__title d-flex'>
                            <FontAwesomeIcon icon={faTruckArrowRight} style={{ height: "20px" }} />
                            <p className='ms-2 d-flex align-items-center fs-6'>Free Shipping</p>
                        </div>
                        <div className='shipping__content d-flex flex-column'>
                            <span>Free Standard Shipping on Orders over $150</span>
                            <span>Estimated delivery time  is usually at least 1 days after order and at least 7 days for overseas delievery </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 mx-md-5 mx-3 more-details'>
                <h4 className='mb-3 pb-2'>More Details</h4>
            <div className='html-content-wrapper'>
                <div dangerouslySetInnerHTML={{__html:selectedProduct.products.body_html}}>

                </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductDetails;