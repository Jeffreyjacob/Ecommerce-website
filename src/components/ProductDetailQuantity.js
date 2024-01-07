import React, { useEffect, useState } from 'react';
import './productDetailQuantity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import {  quantityDecrement, quantityIncrement } from '../features/QuantitySlice';

const ProductDetailQuantity = ({ price,count, shouldDisplay}) => {
  const dispatch = useDispatch()
  const [number1,setNumber1] = useState(price);
  const [number2,setNumber2] = useState('')

  const plus = ()=>{
    dispatch(quantityIncrement());
    setNumber2(count);
  }
  const minus = ()=>{
    dispatch(quantityDecrement());
    setNumber2(count);
  }

  const SubTotal = number1 * number2
  
  return (
    <div className='ProductDetailQuantity mt-2'>
      <div className='counter d-flex'>
      <button className='btn' type='button' onClick={minus}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span>{count}</span>
        <button className='btn' type='button' onClick={plus}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className='productSubTotal mt-3' style={{display:`${ shouldDisplay}`}}>
        <p>SubTotal: <span>
          ${SubTotal}
        </span></p>
      </div>
    </div>
  )
}

export default ProductDetailQuantity;