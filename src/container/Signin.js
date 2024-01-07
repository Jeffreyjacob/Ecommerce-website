import React, { useState } from 'react';
import './signin.css';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../features/userSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onsubmit = (data) => {
    setLoading(true);
    auth.signInWithEmailAndPassword(data.email, data.password).then(
      userAuth => {
        dispatch(UserLogin({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName:userAuth.user.displayName
        }))
        setLoading(false);
        navigate('/')
      }

    ).catch(error => {
      setLoading(false)
      alert(error.message);
    })
  }
  return (
    <div className='sign-in ms-md-5 mx-md-0 mx-2 pt-5'>
      <h4 className='signIn__header'>Login</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <div className='create__text'>
          <p>New User ? <span onClick={()=>navigate('/signup')}>Create an account</span></p>
          </div>
      
          <div class="mb-3 signup-input">
            <label for="exampleFormControlInput1" class="form-label">Email Address</label>
            <input name='email' type="email" class="form-control" {...register('email', { required: true })} />
          </div>

          <div class="mb-3 signup-input">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input name='password' type="password" class="form-control" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must have at least 6 characters" } })} />
            {errors?.password && errors?.password.type === "required" && (
              <span>{errors?.password.message}</span>
            )}
          </div>

          <button className='btn btn-dark px-5 mt-2' type='submit' id='signup-button'>
            Sign In
          </button>

          <div>
            <p className='mt-3' style={{ borderBottom: "1px solid black", width: "fit-content" }}>Forgot your Password?</p>
          </div>

        
        
        </div>
      </form>

      <div className='spinner'>
        <Spinner
          loading={loading}
          color='black'
          size={80}
        />
      </div>
    </div>
  )
}

export default Signin;