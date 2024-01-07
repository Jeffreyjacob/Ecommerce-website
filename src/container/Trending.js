import React, { useEffect, useState } from 'react';
import './trending.css';
import { db } from '../firebase';
import Product from '../components/Product';
import Skeleton from 'react-loading-skeleton';

function Trending() {
   const [Products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {

      const fetchProduct = async () => {
         try {
            setLoading(true);
            const specificDocumentId = "QiyfnD3IGQUZG9DBX6j8"
            const docRef = await db.collection('Products').doc(specificDocumentId).get();
            if (docRef.exists) {
               const productData = docRef.data();
               console.log(productData)
               const filteredProduct = []
               if (productData && Array.isArray(productData.data)) {
                  productData.data.forEach(product => {
                     if (product.product_type === "trending") {
                        filteredProduct.push(product);
                        setProducts(filteredProduct);
                        setLoading(false)
                     }
                  })
               }
            }
         } catch (error) {
            console.error(error);
         }
      }

      fetchProduct()
   }, [])
   const Loading = () => {
      return (
         <div className='row'>
            <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
               <Skeleton height="300px" width='270px' />
            </div>
            <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
               <Skeleton height="300px" width='270px' />
            </div>
            <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
               <Skeleton height="300px" width='270px' />
            </div>
            <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center'>
               <Skeleton height="300px" width='270px' />
            </div>
            <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center '>
               <Skeleton height="300px" width='270px' />
            </div>
            <div className='col-lg-4 col-md-6 col-12 my-md-4 my-3 d-flex  justify-content-center align-items-center'>
               <Skeleton height="300px" width='270px' />
            </div>
         </div>
      )
   }
   const TrendingProduct = ()=>{
      return(
         <>
             {
                        Products.map((product) => {
                           return (
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

   return (
      <div className='trending mt-5'>
         <div>
            <img src='https://ucarecdn.com/9247d70a-0c73-41ca-ab2f-d1dd812e1864/womanposingblackdressfullshot.jpg'
               width='100%' height='360px' style={{ backgroundSize: "cover", objectPosition: "top", objectFit: "cover" }} />
         </div>
         <div className='trending__content mt-5 container-fluid'>
            <h3 className='text-center'>TRENDING NOW</h3>
            <div className='row px-md-5'>
               {
                  loading ? <Loading /> : <TrendingProduct/>
               }
               </div>
         </div>

      </div>
   )
}

export default Trending


