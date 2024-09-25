//displays component only is user is authenticated

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    //naviagte can be used only inside useeffect block
    useEffect(()=>{
        if(!user.name){
            navigate('/signin');
            toast.error("Sign In to continue!");
            return;
        }
    }, [])

    return children;
  };

export default ProtectedRoute