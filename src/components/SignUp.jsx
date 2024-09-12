import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authServices from '../appWrite/authAppwrite';
import { login } from '../redux/authSlice';

const SignUp = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);

    

    

    const signup = async (data) => {
        try {
            setLoading(true)
            setError(null);
            const userAccount = await authServices.createAccount(data);
            if (userAccount) {
                const currentUser = await authServices.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err.message);
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <div className='py-24 flex justify-center items-center'>
            <form className='p-8 border border-blue-400 rounded-lg flex flex-col justify-center items-center gap-8'
                onSubmit={handleSubmit(signup)}>
                <div className='flex flex-col justify-center items-center'>
                    <span className='text-2xl text-blue-600 font-bold'>Create Account</span>
                    <span>Sign up to make an account</span>
                    <span>
                        Already have an account? 
                        <Link className='text-blue-600 font-semibold' to={'/login'}>Login</Link>
                    </span>
                    <span className='text-red-600'>{error}</span>
                </div>
                
                <input
                    className='p-2 border rounded-full border-blue-400 w-full'
                    type='text'
                    placeholder='Enter your full name'
                    {...register('name', { required: true })}
                />
                <input
                    className='p-2 border rounded-full border-blue-400 w-full'
                    type='email'
                    placeholder='Enter your email'
                    {...register('email', {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be valid",
                        },
                    })}
                />
                <div className=' w-full relative'>
                <input
                    className='p-2 border rounded-full border-blue-400 w-full '
                    type={showPassword?'text':'password'}
                    placeholder='Enter your password'
                    {...register('password', { required: true })}
                />
                <button type="button"
                className='outline-none absolute right-3 top-2' 
                disabled={loading}
                onClick={()=>{setShowPassword(!showPassword)}}>{showPassword?'Hide':'Show'}</button>
                </div>
                <button  className='py-2 px-3 hover:bg-blue-500 bg-blue-600 text-white border rounded-full' type='submit'>
                    {loading?'Creating...':'Create Account'}
                </button>
            </form>
        </div>
    )
}

export default SignUp;
