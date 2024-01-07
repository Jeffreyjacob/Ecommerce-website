import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FooterToggle, selectFooterToggle } from '../features/QuantitySlice';


function Footer() {
    const dispatch = useDispatch();
    const selectFooterToggling = useSelector(selectFooterToggle);

    const toggleOpen = (itemId) => {
        dispatch(FooterToggle({ itemId }));
    }
    return (
        <div className='footer bg-dark text-white mt-5 px-md-4 px-3 py-5'>
            {/**small screen */}
            <div className='d-lg-none'>
                <div className='Shop mt-2'>
                    <div className='d-flex justify-content-between' style={{ borderBottom: "1px solid white", paddingBottom: "5px" }}>
                        <h5>SHOP</h5>

                        {
                            selectFooterToggling[12] ? <FontAwesomeIcon icon={faMinus} onClick={() => toggleOpen(12)} /> :
                                <FontAwesomeIcon icon={faPlus} onClick={() => toggleOpen(12)} />
                        }

                    </div>
                    {
                        selectFooterToggling[12] && <div className='d-flex flex-column hidden-section mb-4' >
                            <span>New In</span>
                            <span>Women</span>
                            <span>Men</span>
                            <span> Shoes</span>
                            <span>Bags & Accessories</span>
                            <span>Top Brands</span>
                            <span>Sale & Special Offers</span>
                        </div>
                    }

                </div>
                <div className='information mt-2'>
                    <div className='d-flex justify-content-between' style={{ borderBottom: "1px solid white", paddingBottom: "5px" }}>
                        <h5>INFORMATION</h5>
                        {
                            selectFooterToggling[13] ? <FontAwesomeIcon icon={faMinus} onClick={() => toggleOpen(13)} /> :
                                <FontAwesomeIcon icon={faPlus} onClick={() => toggleOpen(13)} />
                        }
                    </div>
                    {
                        selectFooterToggling[13] && <div className='d-flex flex-column hidden-section mb-4' >
                            <span>About</span>
                            <span>Customer Service</span>
                            <span>Reward Program</span>
                            <span>Shipping & Returns</span>
                            <span>Privacy Policy</span>
                            <span>Terms & Conditions</span>
                            <span>Blog</span>
                        </div>
                    }
                </div>
                <div className='customer service mt-2'>
                    <div className='d-flex justify-content-between' style={{ borderBottom: "1px solid white", paddingBottom: "5px" }}>
                        <h5>CUSTOMER SERVICE</h5>

                        {
                            selectFooterToggling[14] ? <FontAwesomeIcon icon={faMinus} onClick={() => toggleOpen(14)} /> :
                                <FontAwesomeIcon icon={faPlus} onClick={() => toggleOpen(14)} />
                        }
                    </div>
                    {
                        selectFooterToggling[14] && <div className='d-flex flex-column hidden-section mb-4' >
                            <span>Search Terms</span>
                            <span>Advanced Search</span>
                            <span>Orders And Returns</span>
                            <span>Contact Us</span>
                            <span>Theme FAQs</span>
                            <span>Consultant</span>
                            <span>Store Locations</span>
                        </div>
                    }
                </div>
                <div className='form mt-4 pb-5' style={{ borderBottom: "1px solid gray" }}>
                    <h5>NEWSLETTER SIGNUPS</h5>
                    <p style={{ fontSize: "12px" }}>Sign up for exclusive updates, new arrivals & insider only discounts</p>
                    <div className='row'>
                        <div className='col-8'>
                            <input type="email" class="form-control" placeholder="Enter Your Email Address" style={{ borderRadius: "0px" }} />
                        </div>
                        <div className='col-4'>
                            <button className="btn btn-light btn-outline-dark px-3" style={{ fontWeight: "bold", borderRadius: "0px" }}>
                                SUBMIT
                            </button>
                        </div>
                    </div>

                </div>
                <p className='mt-3 text-center'>JetStore. All Rights Reserved. Powered By Shopify.</p>
            </div>
            {/**large and medium screen */}
            <div className='d-none d-lg-block'>
                <div className='row gap-2'>
                    <div className='col-lg-2'>
                        <h5>SHOP</h5>
                        <div className='d-flex flex-column hidden-section mb-4' >
                            <span>New In</span>
                            <span>Women</span>
                            <span>Men</span>
                            <span> Shoes</span>
                            <span>Bags & Accessories</span>
                            <span>Top Brands</span>
                            <span>Sale & Special Offers</span>
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <h5>INFORMATION</h5>
                        <div className='d-flex flex-column hidden-section mb-4' >
                            <span>About</span>
                            <span>Customer Service</span>
                            <span>Reward Program</span>
                            <span>Shipping & Returns</span>
                            <span>Privacy Policy</span>
                            <span>Terms & Conditions</span>
                            <span>Blog</span>
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <h5>CUSTOMER SERVICE</h5>
                        <div className='d-flex flex-column hidden-section mb-4' >
                            <span>Search Terms</span>
                            <span>Advanced Search</span>
                            <span>Orders And Returns</span>
                            <span>Contact Us</span>
                            <span>Theme FAQs</span>
                            <span>Consultant</span>
                            <span>Store Locations</span>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <h5>NEWSLETTER SIGNUPS</h5>
                        <p style={{ fontSize: "12px" }}>Sign up for exclusive updates, new arrivals & insider only discounts</p>
                        <div className='row'>
                            <div className='col-8'>
                                <input type="email" class="form-control" placeholder="Enter Your Email Address" style={{ borderRadius: "0px" }} />
                            </div>
                            <div className='col-4'>
                                <button className="btn btn-light btn-outline-dark px-3" style={{ fontWeight: "bold", borderRadius: "0px" }}>
                                    SUBMIT
                                </button>
                            </div>
                        </div>

                    </div>


                </div>

                <p className='mt-4' style={{fontSize:"12px"}}>JetStore. All Rights Reserved. Powered By Shopify.</p>
            </div>
        </div>
    )
}

export default Footer;