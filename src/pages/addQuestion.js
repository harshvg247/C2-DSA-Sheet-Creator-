/**
 * AddQuestion component allows users to add a new question to the system.
 * It takes user input for category, subcategory, title, and link, and submits it to the server.
 * Upon successful submission, it navigates to the home page and displays a success toast.
 * In case of an error, it logs the error, displays an error toast, and navigates to the sign-in page.
 */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addQuestionAsync } from '../action/questionActions';
import { toast } from 'react-toastify';

function AddQuestion() {

    const user = useSelector((state) => state.user);



    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ category: '', subCategory: '', title: '', link: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(addQuestionAsync(formData)).unwrap();
            navigate('/');
            toast.success('Question added successfully');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            navigate('/');
        }

    }

    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
        // setformdata will take some time before making changes
    }

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <form onSubmit={handleSubmit} onChange={handleChange} className='flex flex-col justify-center items-center gap-2 w-2/3 text-center bg-secondary p-8 rounded-lg border-[2px] border-font2'>
                <h2 className='text-3xl'>Add Question</h2>
                <div className='flex flex-col gap-1 text-left w-full'>
                    <label htmlFor='category'>Category</label>
                    <input required name='category' type='text' id='category' placeholder='Enter category' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <label htmlFor='subCategory'>Subcategory</label>
                    <input required name='subCategory' type='text' id='subCategory' placeholder='Enter subcategory' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <label htmlFor='title'>Title</label>
                    <input required type='text' id='title' placeholder='Enter question title' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <label htmlFor='link'>Link</label>
                    <input required type='text' id='link' placeholder='Paste question link' className='bg-secondary border-[1px] border-font3 py-1 px-2 rounded' />
                    <button className='bg-font2 mt-2 p-1 rounded'>Add Question</button>
                </div>
            </form >
        </div >
    )
}

export default AddQuestion