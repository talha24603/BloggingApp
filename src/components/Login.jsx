import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authServices from '../appWrite/authAppwrite'
import { useDispatch } from 'react-redux'
import {login as authLogin} from '../redux/authSlice'
const Login =  () => {
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)

    const [showPassword,setShowPassword]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const login= async (data)=>{
        try {
            setLoading(true)
            const user= await authServices.login(data)   
            console.log(user);
            
            if (user) {
                const currentUser=await authServices.getCurrentUser()
                if (currentUser) {
                    dispatch(authLogin(currentUser))
                    navigate('/')
                }
               
            } 
        } catch (err) {
            setError( err.message)
        }
        finally{
            setLoading(false)
        }
        setError(null)
           

    }
  return (
    <div className='py-24 flex  justify-center items-center'>
        <form className='p-8 border border-blue-400 rounded-lg flex flex-col justify-center items-center gap-8' onSubmit={handleSubmit(login)}>
            <div className='flex flex-col justify-center items-center'>
            <span className='text-2xl text-blue-600 font-bold'>Login</span>
            <span>Login to your account</span>
            <span>
            If you don't have account? 
                <Link className='text-blue-600 font-semibold' to={'/signup'}> SignUp</Link>
            </span>
            </div>
            <span>{error}</span>
            <input className='p-2 border rounded-full border-blue-400 w-full'
            label='Email:'
            type='email'
            placeholder='enter your email'
            {...register('email', {required: true})}
            />
            <div className='w-full relative'>
            <input className='border-blue-400 border rounded-full p-2 w-full'
            label='Password:'
            type={showPassword?'text':'password'}

            placeholder='enter your password'
            {...register('password', {required: true})}
            /> 
            <button type="button" className='outline-none absolute right-3 top-2' onClick={()=>{setShowPassword(!showPassword)}}>{showPassword?'Hide':'Show'}</button>

            </div>
            <button className='py-2 px-3 hover:bg-blue-500 bg-blue-600 text-white border rounded-full'
            disabled={loading}
            type='submit'>
                {loading?'logging in...':'Login'}
                </button>
        </form>
    </div>
  )
}

export default Login