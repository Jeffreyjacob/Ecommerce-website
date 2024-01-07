import { CSSProperties, useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { UserLogin } from '../features/userSlice';


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const Notification = (error) => {
        NotificationManager.warning(error, 'Close after 3000ms', 3000);
    }
    const onsubmit = (data) => {
        setLoading(true);
        console.log(data)
        auth.createUserWithEmailAndPassword(data.email, data.password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: data.firstName
            }).then(() => {
                dispatch(UserLogin({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: data.firstName,
                    lastname: data.lastName
                }))
            })
            setLoading(false)
            navigate('/')
        }).catch(error => {
            setLoading(false)
            alert(error.message)
            Notification(error.message);
        })
    }
    return (
        <div className='signup ms-md-5 mx-md-0 mx-2'>
            <nav className='pt-4' aria-label="breadcrumb" style={{ fontSize: "14px", color: "gray", fontFamily: " M PLUS Rounded 1c', sans-serif" }}>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a onClick={() => navigate('/')}>Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Account</li>
                </ol>
            </nav>

            <div className='signup__header'>
                <h4>CREATE ACCOUNT</h4>
                <p>Please register below to create an account</p>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <div class="mb-3 signup-input">
                        <label for="exampleFormControlInput1" class="form-label">First Name</label>
                        <input name='firstName' type="text" class="form-control" {...register('firstName', { required: true })} />
                    </div>
                    <div class="mb-3 signup-input">
                        <label for="exampleFormControlInput1" class="form-label">Last Name</label>
                        <input name='lastName' type="text" class="form-control" {...register('lastName', { required: true })} />
                    </div>
                    <div class="mb-3 signup-input">
                        <label for="exampleFormControlInput1" class="form-label">Your Email Address</label>
                        <input name='email' type="email" class="form-control" {...register('email', { required: true })} />


                    </div>
                    <div class="mb-3 signup-input">
                        <label for="exampleFormControlInput1" class="form-label">Your password</label>
                        <input name='password' type="password" class="form-control" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must have at least 6 characters" } })} />
                        {errors?.password && errors?.password.type === "required" && (
                            <span>{errors?.password.message}</span>
                        )}

                    </div>
                    <button className='btn btn-dark px-5 mt-2' type='submit' id='signup-button'>
                        Create An Account
                    </button>

                    <p className='signup-link mt-4'>You already have an account ? <a onClick={() => navigate('/signin')} >Sign In</a></p>
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

export default Signup;