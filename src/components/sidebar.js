// Sidebar component that displays a navigation menu on the left side of the page.

import React from 'react'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hidden, setHidden] = useState(false);
    const sideBarRef = useRef(null);

    // Retrieves the user's name from the Redux store.
    const user = useSelector((state) => state.user.name)

    // Function to handle hiding and showing the sidebar
    /**
     * Handles the click event for the arrow button.
     * Expands or collapses the sidebar based on its current state.
     */
    function handleHideBtnClick() {
        if (hidden) {
            sideBarRef.current.style.width = '14rem';
            const hideArrowElem = sideBarRef.current.querySelector('.hidearrow');
            hideArrowElem.style.left = '9rem';
            hideArrowElem.style.transform = 'rotate(0deg)';
            setHidden(false);

        } else {
            sideBarRef.current.style.width = '3rem';
            const hideArrowElem = sideBarRef.current.querySelector('.hidearrow');
            hideArrowElem.style.left = '.5rem';
            hideArrowElem.style.transform = 'rotate(180deg)';
            setHidden(true);
        }
    }

    // Function to handle logging out
    /**
     * Handles the click event for the log out button.
     * Clears the user's information from local storage, dispatches the clearUserInfo action,
     * navigates to the home page, and displays a success toast message.
     */
    function handleLogOutBtnClick() {
        localStorage.clear();
        dispatch(clearUserInfo());
        navigate('/');
        toast.success('Logged out successfully!');
    }


    return (
        <div ref={sideBarRef} className='w-56 bg-secondary relative duration-300 border-r-2 border-font2'>

            <div className='fixed left-36 top-2 hidearrow duration-300 z-10'>
                <button onClick={handleHideBtnClick}><ion-icon style={{ 'color': "#3A0CA3" }} size="large" name="arrow-back-sharp"></ion-icon></button>
            </div>
            <div className='fixed'>
                <div className='p-2 mt-14 text-xl'>
                    <ul className=''>
                        <li className={`flex items-center gap-2 mt-auto mb-5 ${hidden && 'justify-center'}`}>
                            {!hidden && <span className='w-44'>{user}</span>}
                        </li>
                        <Link to="/" ><li className={`flex items-center gap-2 mt-auto mb-5 ${hidden && 'justify-center'}`}>
                            <ion-icon size="large" name="person-circle-outline"></ion-icon>
                            {!hidden && <span className='w-44'>Profile</span>}
                        </li></Link>
                        <li className={`flex items-center gap-2 mt-auto mb-5 ${hidden && 'justify-center'}`}>
                            <ion-icon size="large" name="home-outline"></ion-icon>
                            {!hidden && <span className='w-44'>Home</span>}
                        </li>
                        {!user ?
                            <Link to="/signin" >
                                <li className={`flex items-center gap-2 mt-auto mb-5 ${hidden && 'justify-center'}`}>
                                    <ion-icon size="large" name="log-in-outline"></ion-icon>
                                    {!hidden && <span className='w-44'>Sign In</span>}
                                </li>
                            </Link>
                            :
                            <>
                                <Link to="/addQuestion" >
                                    <li className={`flex items-center gap-2 mt-auto mb-5 ${hidden && 'justify-center'}`}>
                                        <ion-icon size="large" name="add"></ion-icon>
                                        {!hidden && <span className='w-44'>Add Question</span>}
                                    </li>
                                </Link>
                                <li onClick={handleLogOutBtnClick} className={`flex items-center gap-2 mt-auto mb-5 hover:cursor-pointer ${hidden && 'justify-center'}`}>
                                    <ion-icon size="large" name="log-out-outline"></ion-icon>
                                    {!hidden && <span className='w-44'>Log Out</span>}
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar