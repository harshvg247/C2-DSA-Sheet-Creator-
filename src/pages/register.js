import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosConfig';
function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ name:'', email: '', password: '' });
    const [isPwdHidden, setIsPwdHidden] = useState(true);

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/register', formData);
            localStorage.setItem('token', response.data.user.token);
            dispatch(setUserInfo(response.data.user));
            navigate('/');
            toast.success(`Registered successfully as ${response.data.user.name}!`);
          } catch (error) {
            console.error('Error registering user:', error.response.data);
            toast.error(error)
          }
    }
    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }
    function handleEyeClick() {
        setIsPwdHidden(!isPwdHidden);
    }

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <form onSubmit={handleSubmit} onChange={handleChange} className='flex flex-col justify-center items-center gap-2 w-96 text-center bg-secondary p-8 rounded-lg border-[2px] border-font2'>
                <h2 className='text-3xl'>Sign Up</h2>
                <h3 className='text-font3'>Sign Up to Track Your Progress and Master DSA</h3>
                <div className='flex flex-col gap-1 text-left w-full'>
                <label htmlFor='name'>Name</label>
                    <input required type='string' id='name' placeholder='Enter name' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <label htmlFor='email'>Email</label>
                    <input required type='email' id='email' placeholder='Enter mail id' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <label htmlFor='password'>Password</label>
                    <div className='relative'>
                        <input required type={isPwdHidden ? 'password' : 'text'} id='password' placeholder='Enter password' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded w-full' />
                        <span className='absolute right-2 h-full flex top-0 items-center' onClick={handleEyeClick}>
                            {!isPwdHidden ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>}</span>
                    </div>
                    <button className='bg-font2 mt-2 p-1 rounded'>Sign Up</button>
                    <p className='text-font3 w-full text-right'>Already have an account? <Link to="/signin" className='text-font2'>Sign In</Link></p>
                </div>

            </form>
        </div>
    )
}

export default Register