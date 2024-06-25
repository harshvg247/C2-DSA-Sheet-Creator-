import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/notFound';
import Sidebar from './components/sidebar';
import SignIn from './pages/signIn';
import AddQuestion from './pages/addQuestion';
import Register from './pages/register';
import { useEffect } from 'react';
import axios from 'axios'
import { legacy_createStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './features/users/userSlice';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const dispatch = useDispatch();


  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      try {
        const response = await axios.get('http://localHost:5000/api/user/currentUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        dispatch(setUserInfo(response.data.user));
      } catch (err) {
        console.log(err);
      }
    }


  }

  useEffect(() => {
    console.log('Loading user');
    loadUser();

  }, []);


  return (
    <Router>
      <div className='flex bg-primary min-h-screen text-font1'>
        <Sidebar />
        <ToastContainer theme='dark' autoClose='2500' transition={Zoom}/>
        
        <div className='w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addQuestion" element={<AddQuestion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
};

export default App;
