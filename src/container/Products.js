import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Product from '../components/Product';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../firebase';

function Products() {
  const shopifyStoreURL = 'https://a1075f-3.myshopify.com/admin/api/2023-10/products.json';
  const storefrontAccessToken = "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";
  const API_URI = `https://fakestoreapi.com/products/category/women's clothing`;
  const [data, setData] = useState([]);
  const [productF,setProduct] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    const GetAllProduct = async () => {
      try {
        const headers = {
          'X-Shopify-Access-Token': storefrontAccessToken,
          'Content-Type': 'application/json', 
        };
        const response = await axios.get('http://localhost:5000/products').then(
          response =>{
            
            setData(response.data.products);
             console.log(response.data.products)

          }
        )
      } catch (error) {
        console.error(error);
      }
    }

    const FirebaseProduct = async ()=>{
      try{
        setLaoding(true);
        const specificDocumentId = "QiyfnD3IGQUZG9DBX6j8";
        const docRef = await db.collection('Products').doc(specificDocumentId).get();
        if (docRef.exists) {
          const productData = docRef.data();
           const filteredProducts = [];

           if(productData && Array.isArray(productData.data)){
              productData.data.forEach(products =>{
                if(products.product_type === 'women clothes'){
                  filteredProducts.push(products);
                }
              })
              const trending = filteredProducts.slice(0,6);
              setProduct(trending);
              setLaoding(false);
           }
        } 

      }catch (error){
        console.error(error);
      }
    }
  
    GetAllProduct();
    FirebaseProduct();
  }, [])
 
  const addingProducts = async ()=>{
    try{
     db.collection('Products').add({
        data:data
     })
    }catch(error){

    }
 }
  const ShowProduct = () => {
    return (
      <>

        {
          productF.map((product) => {
            return(
               <>
                <Product
                key={product.id}
                title={product.title}
                price={product.variants[0].price}
                photourl={product.image.src}
                hoverImage={product.images[1].src}
                category={product.product_type}
                WholeInfo={product}
                />
               </>
            )
                
             
          })
        }




      </>
    )
  }
  const Loading = () => {
    return(
      <div className='row d-flex  justify-content-center'>
        <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
            <Skeleton  height="300px" width='270px'/>
        </div>
        <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
            <Skeleton  height="300px" width='270px'/>
        </div>
        <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
            <Skeleton  height="300px" width='270px'/>
        </div>
        <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center'>
            <Skeleton  height="300px" width='270px'/>
        </div>
        <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
            <Skeleton  height="300px" width='270px'/>
        </div>
        <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center'>
            <Skeleton  height="300px" width='270px'/>
        </div>
      </div>
    )
  }

  return (
    <div className='container-fluid '>
      <div className='row px-md-5'>
      {loading ? <Loading/> : <ShowProduct />}
      </div>
    </div>
  )
}

export default Products;