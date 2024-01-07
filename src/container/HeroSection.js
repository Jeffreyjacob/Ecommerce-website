import React from 'react';
import './heroSection.css';
import SelectCard from '../components/SelectCard';

function HeroSection() {
    return (
        <div className='heroSection'>

            <div className='heroSection__header d-flex justify-content-md-start  mx-md-5 mx-3 '>
                <div className='col-md-5 '>
                    <h2 className='heroSection__mainheader'>COSMOPOLIS</h2>
                    <p className='heroSection_subheader'>Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo lacus meleifend menean diverra loremous.</p>
                    <div className='heroSection__button d-flex justify-content-center'>
                        <button type='button' className='btn btn-dark text-white text-center px-5 py-2'>
                            SHOP NOW
                        </button>
                    </div>
                </div>

            </div>

            

        </div>
    )
}

export default HeroSection;