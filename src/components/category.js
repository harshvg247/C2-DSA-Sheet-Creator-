import React, { useRef, useState } from 'react'
import Subcategory from './subcategory';
import { useSelector } from 'react-redux';


function Category({ category }) {

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


            <div className={`mx-3 my-4 border-[1px] ${isHidden ? 'border-font3' : 'border-font2'}  bg-[#2B2D32] rounded text-font3 `}>
                <div className={`flex  justify-between px-6 items-center bg-secondary p-1 border-b-[1px] ${isHidden ? 'border-font3' : 'border-font2'} rounded hover:text-font1 hover:bg-tertiary`} onClick={handleDownBtnClick}>
                    <span>{category?.name}</span>
                    <div className='flex w-48 justify-around items-center'>
                        <span className='w-1/2 text-center'>5/7</span>
                        <span className='w-1/2 text-center duration-100 flex justify-center' ref={downAroowRef}>
                            <ion-icon size="large" name="caret-down-sharp"></ion-icon>
                        </span>
                    </div>
                </div>
                {category?.subCategories.map((subCategory) => {
                    return (
                        !isHidden && <Subcategory subCategory={subCategory} category={category.name}/>

                    )
                })}
            </div>



        </>
    )
}

export default Category