import React, { useEffect, useState } from 'react';
import './maincart.css';
import { db } from '../firebase';
import Cart from '../components/Cart';
import Skeleton from 'react-loading-skeleton';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import ProductDetailQuantity from '../components/ProductDetailQuantity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function MainCart() {
    const [loading, setLoading] = useState(true);
    const [carts, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCart = () => {
            db.collection('cart').orderBy('timeStamp', 'desc').onSnapshot(
                snapshot => {
                    setLoading(true)
                    const items = snapshot.docs.map(docs => ({
                        id: docs.id,
                        data: docs.data()
                    }))

                    setCart(items)
                    setLoading(false)
                }
            )
        }
        fetchCart()

    }, [])
    const deleteCart = async (cartid) => {
        try {
            db.collection('cart').doc(cartid).delete()
        } catch (error) {
            console.error(error)
        }
    }

    const calculateSubtotal = () => {
        let subtotal = 0;
        for (const item of carts) {
          const { quantity, price } = item.data;
          subtotal += quantity * price;
        }
        return subtotal;
      };

    const DisplayCart = () => {
        return (
            <div>
                {
                    carts.map(({ id, data: { image, price, quantity, title, timeStamp } }) => (
                        <div className='cart shadow' key={id}>
                            <div className='row'>
                                <div className='col-md-2 col-3 mt-2' id="cart__image">
                                    <img src={image} width='100%' height="110px"/>
                                </div>
                                <div className='col-md-10 col-9 row gap-1'>
                                    <div className='col-md-5 col-7 d-flex flex-column align-items-center mt-2'>
                                        <h6>{title}</h6>
                                        <p className='date'>{new Date(timeStamp?.seconds * 1000).toUTCString()}</p>
                                    </div>

                                    <p className='col-md-2 col-2 price '>${price}</p>
                                    <div className='col-md-3 d-flex gap-3'>
                                        <div className='mt-md-4'>
                                            <ProductDetailQuantity count={quantity}
                                                shouldDisplay='none'
                                            />
                                        </div>
                                        <p className='total__price'>${quantity * price}</p>
                                        <div className='mt-md-4'>
                                            <button type='button' className='btn ' onClick={() => deleteCart(id)}>
                                                <FontAwesomeIcon icon={faXmark} className='mt-2' style={{ height: "25px" }} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    const Showloading = () => {
        return (
            <div>
                <div>
                    <Skeleton width='100%' height='150px' />
                </div>
            </div>
        )
    }
    return (
        <div className='maincart'>
            <div className='mainCart___backbutton'>
                <button className='btn' type='button' onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </div>
            <h3 className='maincart__mainHeader mt-4 mx-2 mx-md-3'>Your Cart</h3>
            <div className='row mx-md-4 mx-2 mt-5'>
                <div className='col-lg-8 col-12'>
                    <div className='cardProductHeader d-flex px-4'>
                        <p className='col-6'>Product</p>
                        <p className='col-2 text-center cardHeader__price'>Price</p>
                        <p className='col-2 text-center cardHeader__text'>Quantity</p>
                        <p className='col-2 text-center cardHeader__text'>Total</p>
                    </div>
                    <div>
                        {
                            loading ? <Showloading /> : <DisplayCart />
                        }
                    </div>
                    <div className='comments mt-5 mx-md-2'>
                        <p className='comment-title'>Additional Comments</p>
                        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='Special instruction for seller...' rows="4"></textarea>
                    </div>
                </div>

                <div className='col-lg-4 mt-md-0 mt-5 Order__summary'>
                    <h6 className='orderSummary__title'>ORDER SUMMARY</h6>
                    <div className='d-flex mt-3 align-items-center justify-content-between' style={{ borderBottom: "2px solid #f0f1f7 " }}>
                        <p className='subtotal'>Subtotal</p>
                        <p className='subtotal__price'>${calculateSubtotal()}</p>
                    </div>

                    <div className='shippingEstimate pb-4' style={{borderBottom:"2px solid #f0f1f7"}}>
                        <p>Get shipping Estimate</p>
                        <select className='form-select w-100 my-3'>
                            <option selected>Nigeria</option>
                            <option>United state</option>
                            <option>United kingdom</option>
                        </select>
                        <input className='form-control w-50 my-3' type='text' placeholder='Postal Code' />

                        <div>
                            <button type='button' className='btn btn-dark w-100' style={{padding:"10px",borderRadius:"0px"}}>
                                CALCULATE SHIPPING
                            </button>
                        </div>
                    </div>

                    <div className='d-flex  mt-3 align-items-center justify-content-between' style={{ borderBottom: "2px solid #f0f1f7 " }}>
                        <p className='total'>Total</p>
                        <p className='total__price'>${calculateSubtotal()}</p>
                    </div>

                    <div className='checkout'>
                      <p>Tax included and shipping calculated at checkout</p>
                      <button type='button' className='btn btn-dark my-4 w-100'>
                       PRODEED TO CHECKOUT
                      </button>
                      <button type='button' className='btn btn-outline-dark w-100'>
                        CONTINUE SHOPPING
                      </button>
                    </div>

                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default MainCart;