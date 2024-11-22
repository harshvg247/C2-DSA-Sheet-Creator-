import React, { useRef, useState } from 'react'
import Questions from './questions'
import BeatLoaderComponent from './beatLoader';
import { useDispatch } from 'react-redux';
import { deleteSubCategoryAsync } from '../action/questionActions';
import { toast } from 'react-toastify';
function Subcategory({ subCategory, categoryName }) {

    const [isHidden, setIsHidden] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const downAroowRef = useRef(null);

    const dispatch = useDispatch();
    function handleDownBtnClick() {

        setIsHidden(!isHidden);
        if (isHidden) {
            downAroowRef.current.style.transform = 'rotateX(180deg)';
        } else {
            downAroowRef.current.style.transform = 'rotateX(0deg)';

        }
    }
    const handleDeleteSubCategory = async(e) => {
        e.stopPropagation();
        setDeleting(true);
        try {
            console.log(categoryName);
            await dispatch(deleteSubCategoryAsync({ category: categoryName, subCategory: subCategory.name})).unwrap();
            toast.success('SubCategory deleted!');
        } catch (error) {
            toast.error(error);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <>
            <div className='mx-6 my-2'>
                <div className='flex bg-secondary justify-between px-6 items-center rounded hover:text-font1 hover:bg-tertiary' onClick={handleDownBtnClick}>
                    <span>{subCategory.name}</span>
                    <div className='flex w-48 justify-around items-center'>
                    <span onClick={(e)=>handleDeleteSubCategory(e)} className='w-1/4 flex justify-center items-center text-2xl text-red-400 hover:cursor-pointer hover:text-red-600 duration-300'>{deleting ? <BeatLoaderComponent /> : <ion-icon name="remove"></ion-icon>}</span>
                        <span className='w-1/2 text-center duration-100 flex justify-center' ref={downAroowRef}>
                            <ion-icon size="large" name="caret-down-sharp"></ion-icon>
                        </span>
                    </div>
                </div>
                <div className='mb-3 mt-1 mx-6'>
                    {!isHidden && subCategory.questions.length > 0 && <><div className='flex bg-secondary justify-between px-6 mb-1 p-2 rounded'>
                        <span>Question</span>
                        <div className='flex w-72 justify-around'>
                            <span className='w-1/4 text-center'>Notes</span>
                            <span className='w-1/4 text-center'>Link</span>
                            <span className='w-1/4 text-center'>Status</span>
                            <span className='w-1/4 text-center'>Revise</span>
                            <span className='w-1/4 text-center'>Delete</span>
                        </div>
                    </div>
                        {subCategory?.questions.map((question) => {
                            return (
                                <Questions key={question.title} question={question} subCategory={subCategory.name} category={categoryName}/>
                            )
                        })}</>}
                    {!isHidden && subCategory.questions.length === 0 && <div className='flex bg-secondary justify-between px-6 mb-1 p-2 rounded'>
                        <span>No question added</span>
                    </div>}

                </div>

            </div>

        </>
    )
}

export default Subcategory