// Asynchronous action creator for adding a question.
// The createAsyncThunk function from the @reduxjs/toolkit library is used to create the asynchronous action creator.

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addQuestion, toggleRevise, toggleCompleted, saveNotes } from '../features/users/userSlice';
import { toast } from 'react-toastify';

export const addQuestionAsync = createAsyncThunk(
    'questions/addQuestionAsync',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/question/addQuestion', payload, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              });
            dispatch(addQuestion(payload)); // Update state if API call is successful
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const toggleReviseAsync = createAsyncThunk(
    'revise/toggleReviseAsync',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/question/toggleRevise', payload, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              });
              console.log(response.data);
            dispatch(toggleRevise(payload)); // Update state if API call is successful
        } catch (error) {
            console.error('Error marking question for revision:', error);
            return rejectWithValue(error);
        }
    }
);

export const toggleCompletedAsync = createAsyncThunk(
    'completed/toggleCompletedAsync',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/question/toggleCompleted', payload, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              });
              console.log(response.data);
            dispatch(toggleCompleted(payload)); // Update state if API call is successful
        } catch (error) {
            console.error('Error marking question for revision:', error);
            return rejectWithValue(error);
        }
    }
);

export const saveNotesAsync = createAsyncThunk(
    'notes/saveNotes',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/question/saveNotes', payload, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              });
            dispatch(saveNotes(payload)); // Update state if API call is successful
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
