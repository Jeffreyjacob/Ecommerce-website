import React from 'react';
import './homepage.css'
import HeroSection from './HeroSection';
import SelectCard from '../components/SelectCard';
import Products from './Products';
import { useNavigate } from 'react-router-dom';
import Trending from './Trending';
import Footer from '../components/Footer';


function Homepage() {
  const navigate = useNavigate();
  return (
    <div>
          <HeroSection/>
          <div className='container-fluid'>
              <div className='row  mt-4 px-md-5 px-2'>
            
          <div className='col-md-4 my-2 d-flex justify-content-center'>
            <SelectCard
              name="EDITOR PICK"
              photoUrl="https://new-ella-demo.myshopify.com/cdn/shop/files/1_257d98ae-1c96-4fdd-b3ea-8439950530cb_165x.jpg?v=1630924167"
              onClick={()=>navigate('/productSection/women clothes')}
            />
          </div>
          <div className='col-md-4 my-2'>
            <SelectCard
              name='SHOES'
              photoUrl="https://new-ella-demo.myshopify.com/cdn/shop/files/2_987fd332-b977-48d4-9e91-aaf5bf9e372e_290x.jpg?v=1630924187"
              onClick={()=>navigate('/productSection/shoes')}
            />
          </div>
          <div className='col-md-4 my-2 '>
            <SelectCard
              name='ACCESSORIES'
              photoUrl='https://new-ella-demo.myshopify.com/cdn/shop/files/3_006e87f5-cb50-4183-81b9-0c6f16774ff5_170x.jpg?v=1630924212'
              onClick={()=>navigate('/productSection/accessories')}
            />
          </div>
          <div className='newArrivals__title'>
            <h3>NEW ARRIVALS</h3>
          </div>
      
              </div>
          </div>
      
        <Products />
        <Trending/>
        <Footer/>
    </div>
  )
}

export default Homepage;