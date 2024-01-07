import React from 'react';
import './cart.css';
import ProductDetailQuantity from './ProductDetailQuantity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';

const Cart = ({ title, image, price, quantity, time,id,imageSize,cartContentSIze}) => {
    const deleteCart = async ()=>{
        try{
           db.collection('cart').doc(id).delete()
        }catch(error){
           console.error(error)
        }
      }
    return (
        <div className='cart'>
            <div className='container row'>
                <div className='col-4'>
                    <img src={image} width='100%' style={{objectFit:"contain"}} height='100px' />
                </div>
                <div className='col-8 '>
                    <h6>{title}</h6>
                    <p className='date'>{time}</p>
                    <p className='price'>${price}</p>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <ProductDetailQuantity count={quantity}
                                shouldDisplay='none'
                            />
                        </div>
                        <div>
                            <button type='button' className='btn ' onClick={deleteCart}>
                            <FontAwesomeIcon icon={faXmark} className='mt-2' style={{height:"25px"}}/>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart;