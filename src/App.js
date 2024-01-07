import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-notifications/lib/notifications.css';
import Header from './container/Header';
import Homepage from './container/homepage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetails from './container/ProductDetails';
import MainCart from './container/MainCart';
import ProductSection from './container/ProductSection';
import Signup from './container/Signup';
import Signin from './container/Signin';
import ScrollToTopOnPageChange from './container/ScrollToTopOnPageChange';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
    <ScrollToTopOnPageChange/>
    <div className="App">
      <Header />
      <div className='app'>
      <Routes>
       <Route path='/' element={ <Homepage/>} />
       <Route path='/productDetails' element={<ProductDetails/>}/>
       <Route path='/cart' element={<MainCart/>} />
       <Route path='/productSection/:name' element={<ProductSection/>} />
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
      </Routes>
      </div>
   
    </div>
    </BrowserRouter>
    
  );
}

export default App;
