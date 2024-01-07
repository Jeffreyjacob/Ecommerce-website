import React, { useEffect, useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Cart from '../components/Cart';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin, UserLogout, selectUser } from '../features/userSlice';


const  Header = ({display})=> {
  const [carts, setCart] = useState([]);
  const navigate = useNavigate()
  const selectUserInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCart = () => {
      db.collection('cart').orderBy('timeStamp', 'desc').onSnapshot(
        snapshot => {
          const items = snapshot.docs.map(docs => ({
            id: docs.id,
            data: docs.data()
          }))

          setCart(items)
        }
      )
    }
   const OnAuthChange = ()=>{
    auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        dispatch(UserLogin({
          email:userAuth.email,
          uid:userAuth.uid,
          displayName:userAuth.displayName,
        }))
      }else{
        dispatch(UserLogout());
      }
    })
   }
    OnAuthChange();
    fetchCart();

  }, [])
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of carts) {
      const { quantity, price } = item.data;
      subtotal += quantity * price;
    }
    return subtotal;
  };
  const logOutFunc = ()=>{
    dispatch(UserLogout());
   auth.signOut()
  }
  return (
    <div className='header'>
      <nav className="navbar  fixed-top shadow " style={{ backgroundColor: "white" }}>
        <div className="container-fluid  d-md-flex justify-content-between mx-md-3 mx-1">

          <a class="navbar-brand">
            <h3>JetStore</h3>
          </a>

          <div className='d-flex navbar__right'>
            <button className='navBar__btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBagShopping} className='custom-icon' />
              <span className='ms-2'>Shopping</span>
              <span className='notify_cart btn btn-info mx-2'>{carts.length}</span>
            </button>
            <div style={{display:`${display}`}}>
            {
              !selectUserInfo ? <div className='navBar__btn' onClick={() => navigate('/signin')}>
                <FontAwesomeIcon icon={faUser} className='custom-icon' />
                <span className='ms-2'>Sign In</span>
              </div> : <div className='navBar__btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar1" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faUser} className='custom-icon' />
              </div>

            }
            </div>
           


          </div>


          {/** offcanvas for cart */}
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Shipping Cart</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <div>
                  <div className='cartcontainer pb-3 pr-3 mb-3'>
                    {
                      carts.map(({ id, data: { image, price, quantity, title, timeStamp } }) => (
                        <div className='pb-3 mb-3' style={{ borderBottom: "1px solid gray" }}>
                          <Cart
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            image={image}
                            quantity={quantity}
                            time={new Date(timeStamp?.seconds * 1000).toUTCString()}
                          />
                        </div>
                      ))
                    }
                  </div>

                  <div >
                    <div className='subTotal'>
                      <p className='subTotal__text'>Subtotal:</p>
                      <p className='subTotel__price'> ${calculateSubtotal()}</p>
                    </div>
                    <div className='total'>
                      <p className='total__text'>Total:</p>
                      <p className='total__price'> ${calculateSubtotal()}</p>
                    </div>
                    <p className='tax'>Tax included and shipping calculated at checkout</p>
                    <button onClick={() => navigate('/cart')} className='btn btn-outline-dark w-100 mb-3' data-bs-dismiss="offcanvas" type='button' style={{ paddingTop: "13px", paddingBottom: "13px", borderRadius: "0px" }}>
                      View Cart
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/**offcanvas for sigin User */}
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar1" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title ms-3" id="offcanvasNavbarLabel1" style={{fontFamily:"font-family: 'M PLUS Rounded 1c', sans-serif;",fontWeight:"400"}}>
                Hi,<span className='ms-1'>{selectUserInfo?.displayName}</span> 
                <span>{selectUserInfo?.lastName}</span>
              
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <div className='login__content ms-3'>
                <div className='account-detail'>
                    <p>Account Details</p>
                  </div>
                  <div className='addresses mt-2'>
                     <p>Addresses</p>
                  </div>
                  <div className='reset-password mt-2'>
                      <p>Reset Password</p>
                  </div>
                  <div className='logout mt-2'>
                    <p data-bs-dismiss="offcanvas" onClick={logOutFunc}>Log Out</p>
                  </div>
                </div>
                  

              </div>

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header