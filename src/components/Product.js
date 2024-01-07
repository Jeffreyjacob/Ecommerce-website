import React from 'react';
import "./product.css";
import { useDispatch } from 'react-redux';
import { openProductDetail } from '../features/productDetailSlice';
import { useNavigate } from 'react-router-dom';

const Product = ({ title, photourl, price,hoverImage,WholeInfo, onClick, category,addButton }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
  const openProduct= ()=>{
      dispatch(openProductDetail({
        products: WholeInfo
      }))
      navigate('/productDetails')
  }
  return (
    <div className='product col-lg-4 col-md-6 col-12 my-md-4 my-3  d-flex flex-column justify-content-center align-items-center'>
      
      <img src={photourl} height='300px' className='product__image' style={{transition: 'transform 0.4s ease-in-out'}}
       onMouseOver={(e) => {
        e.currentTarget.src = `${hoverImage}`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.src = `${photourl}`;
      }}
      />
      <div className='product__details d-flex flex-column justify-content-center align-items-center '>
        <button type='button' className='btn btn-outline-dark w-75 mt-3' onClick={addButton}>Quick Add</button>
        <p className='product__category'>{category}</p>
        <p className='product__title' onClick={openProduct}>{title}</p>
        <div className='product__pricecontainer'>
          <p className='product__price'>
            <span className='mx-2 from'>From</span>
            <span>
              ${price}
            </span>
          </p>
        </div>

      </div>
     
    </div>
  )
}

export default Product;