// Asynchronous action creator for adding a question.
// The createAsyncThunk function from the @reduxjs/toolkit library is used to create the asynchronous action creator.

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addQuestion, toggleRevise, toggleCompleted, saveNotes, deleteQuestion } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosConfig';

export const addQuestionAsync = createAsyncThunk(
    'questions/addQuestionAsync',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/question/addQuestion', payload);
            dispatch(addQuestion(payload)); // Update state if API call is successful
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const toggleReviseAsync = createAsyncThunk(
    'revise/toggleReviseAsync',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/question/toggleRevise', payload);
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
            const response = await axiosInstance.post('/question/toggleCompleted', payload);
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
            const response = await axiosInstance.post('/question/saveNotes', payload);
            dispatch(saveNotes(payload)); // Update state if API call is successful
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteQuestionAsync = createAsyncThunk(
    'question/deleteQuestion',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstance.post('/question/deleteQuestion', payload);
            dispatch(deleteQuestion(payload)); // Update state if API call is successful
        } catch (error) {
            console.error('Error deleting question:', error);
            return rejectWithValue(error.message);
        }
    }
)
