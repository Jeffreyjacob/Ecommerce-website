import React from 'react';
import "./smallscreenHiddenVaraint.css";
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

const SmallScreenHiddenVariant =({ itemTitle,variantImage,variantTitle,variantPrice})=> {
    const addCart = ()=>{
        db.collection('cart').add({
            image: variantImage,
            title: itemTitle,
            size: variantTitle,
            price: variantPrice,
            quantity: "1",
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()

        })
    }
  return (
    <div className='container-fluid row d-flex py-2'>
             <div className='col-4 d-flex flex-column justify-content-center'>
               <div>
                  <img src={variantImage} width='90px' height='100px'/>
               </div>
               <p className='mt-2' style={{fontSize:"11px"}}>
                {variantTitle}
               </p>
             </div>
             <div className='col-8'>
                <p style={{fontSize:"16px",fontWeight:"600"}}>
                   ${variantPrice}
                </p>
                <p>
                    quantity
                </p>
                <button className='btn btn-dark w-100' onClick={addCart} style={{fontSize:"12px",borderRadius:"0px"}}>
                    ADD TO CART
                </button>
             </div>
    </div>
  )
}

export default SmallScreenHiddenVariant;