import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ name: '', password: '' });
    const [isPwdHidden, setIsPwdHidden] = useState(true);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.user.token);
            dispatch(setUserInfo(response.data.user));
            navigate('/');
            toast.success(`Logged in as ${response.data.user.name}!`);
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error(error);
        }
    }

    // Function to handle form input changes
    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    // Function to toggle password visibility
    function handleEyeClick() {
        setIsPwdHidden(!isPwdHidden);
    }

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <form onSubmit={handleSubmit} onChange={handleChange} className='flex flex-col justify-center items-center gap-2 w-96 text-center bg-secondary p-8 rounded-lg border-[2px] border-font2'>
                <h2 className='text-3xl'>Sign In</h2>
                <h3 className='text-font3'>Sign In to Track Your Progress and Master DSA</h3>
                <div className='flex flex-col gap-1 text-left w-full'>
                    <label htmlFor='name'>Name</label>
                    <input required type='name' id='name' placeholder='Enter username' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <label htmlFor='password'>Password</label>
                    <div className='relative'>
                        <input required type={isPwdHidden ? 'password' : 'text'} id='password' placeholder='Enter password' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded w-full' />
                        <span className='absolute right-2 h-full flex top-0 items-center' onClick={handleEyeClick}>
                            {!isPwdHidden ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>}</span>
                    </div>
                    <button className='bg-font2 mt-2 p-1 rounded'>Sign In</button>
                    <p className='text-font3 w-full text-right'>Don't have an account?  <Link to="/register" className='text-font2'>Sign Up</Link></p>
                </div>

            </form>
        </div>
    )
}

export default SignIn