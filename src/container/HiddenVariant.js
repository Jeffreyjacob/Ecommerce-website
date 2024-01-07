import React from 'react';
import './hiddenVariant.css';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

const HiddenVariant = ({id,itemTitle,variantImage, variantTitle, VariantPrice }) => {
    const addCart = ()=>{
        db.collection('cart').add({
            image: variantImage,
            title: itemTitle,
            size: variantTitle,
            price: VariantPrice,
            quantity: "1",
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()

        })
    }
    return (
        <>
            <table className="table table-bordered mb-0 ">
                <tbody>
                    <tr>
                        <td> 
                        <div className=' d-flex justify-content-center align-items-center' style={{width:"186px"}}>
                        <img src={variantImage} width='90px' height='100px' />
                            <span className='ms-3' style={{fontSize:"12px"}}>{variantTitle}</span>
                        </div>
        
                        </td>
                        <td style={{backgroundColor:"#f0f1f7"}}>
                            <div style={{fontSize:"15px",fontWeight:"600"}} className='variant__title d-flex justify-content-center align-items-center'>
                             ${VariantPrice}
                            </div>
                        </td>
                        <td style={{backgroundColor:"#f0f1f7"}} >
                            <div className='variant__quantity d-flex justify-content-center align-items-center'>
                            quantity
                            </div>
                            
                        </td>
                        <td  style={{backgroundColor:"#f0f1f7"}}> 
                            <div className='d-flex justify-content-center align-items-center' style={{height:"90px"}}>
                            <button className='btn btn-dark ' onClick={addCart}>
                                ADD TO CART
                            </button>
                            </div>
                            
                        </td>
                    </tr>
                </tbody>
            </table>


        </>
    )
}

export default HiddenVariant;