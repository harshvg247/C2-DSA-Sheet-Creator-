import React, { useRef, useState } from 'react'
import Questions from './questions'


function Subcategory({ subCategory, category }) {

    const [isHidden, setIsHidden] = useState(true);
    const downAroowRef = useRef(null);
    function handleDownBtnClick() {

        setIsHidden(!isHidden);
        if (isHidden) {
            downAroowRef.current.style.transform = 'rotateX(180deg)';
        } else {
            downAroowRef.current.style.transform = 'rotateX(0deg)';

        }
    }

    return (
        <>
            <div className='mx-6 my-2'>
                <div className='flex bg-secondary justify-between px-6 items-center rounded hover:text-font1 hover:bg-tertiary' onClick={handleDownBtnClick}>
                    <span>{subCategory.name}</span>
                    <div className='flex w-48 justify-around items-center'>
                        <span className='w-1/2 text-center'>5/7</span>
                        <span className='w-1/2 text-center duration-100 flex justify-center' ref={downAroowRef}>
                            <ion-icon size="large" name="caret-down-sharp"></ion-icon>
                        </span>
                    </div>
                </div>
                <div className='mb-3 mt-1 mx-6'>
                    {!isHidden && <><div className='flex bg-secondary justify-between px-6 mb-1 p-2 rounded'>
                        <span>Question</span>
                        <div className='flex w-72 justify-around'>
                            <span className='w-1/4 text-center'>Notes</span>
                            <span className='w-1/4 text-center'>Link</span>
                            <span className='w-1/4 text-center'>Status</span>
                            <span className='w-1/4 text-center'>Revise</span>
                        </div>
                    </div>
                        {subCategory?.questions.map((question) => {
                            return (
                                <Questions question={question} subCategory={subCategory.name} category={category}/>
                            )
                        })}</>}

                </div>

            </div>

        </>
    )
}

export default Subcategory