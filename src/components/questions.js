import React, { useState } from 'react'
import { toggleReviseAsync, toggleCompletedAsync, saveNotesAsync } from '../action/questionActions'
import { useDispatch } from 'react-redux'
import BeatLoaderComponent from './beatLoader';
import Editor from './editor';
import { toast } from 'react-toastify';
function Questions({ question, subCategory, category }) {

    const dispatch = useDispatch();
    const [togglingRevise, setTogglingRevise] = useState(false);
    const [togglingCompleted, setTogglingCompleted] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [savingNotes, setSavingNotes] = useState(false);

    const toggleEditor = () => {
        console.log(question.notes);
        setShowEditor(!showEditor);
    }

    const handleSaveNoteBtn = async (notes) => {

        //  Checks if the new notes are different from the existing ones.
        //  If they are the same, it simply toggles the editor.
        if (notes === question.notes) {
            toggleEditor();
            return;
        }

        setSavingNotes(true);
        try {
            await dispatch(saveNotesAsync({ category: category, subCategory: subCategory, question_title: question.title, notes: notes })).unwrap();
            toast.success('Notes saved successfully!');
            toggleEditor();
        } catch (error) {
            // console.error('Error adding notes:', error);
            toast.error('Error adding notes:', error);
        } finally {
            setSavingNotes(false);
            
            
        }

    }

    //dispatch has been enclosed in try/catch block to handle loading state changes
    const handleReviseBtnClick = async () => {
        setTogglingRevise(true);
        try {
            await dispatch(toggleReviseAsync({ category: category, subCategory: subCategory, question_title: question.title })).unwrap();
            question.revise ? toast('Question unmarked!') : toast.success('Question marked for revision!');
        } catch (error) {
            console.error('Error adding question:', error);
            toast.error(error);
        } finally {
            setTogglingRevise(false);
            
        }
    }
    const handleCompletedBtnClick = async () => {
        setTogglingCompleted(true);
        try {
            await dispatch(toggleCompletedAsync({ category: category, subCategory: subCategory, question_title: question.title })).unwrap();
            question.completed ? toast('Question unmarked!') : toast.success('Question marked completed!');
        } catch (error) {
            console.log(error);
            toast.error(error);
        } finally {
            setTogglingCompleted(false);
        }
    }


    return (

        <div>
            {showEditor && <Editor handleSaveNoteBtn={handleSaveNoteBtn} notes={question?.notes} savingNotes={savingNotes} toggleEditor={toggleEditor} />}
            <div className='flex bg-secondary justify-between px-6 py-2 items-center mb-1 rounded hover:bg-tertiary hover:text-font1'>
                <span className=''>{question?.title}</span>
                <div className='flex w-72 justify-around items-center'>
                    <span onClick={toggleEditor} className={`w-1/4 flex justify-center items-center text-2xl hover:cursor-pointer ${question?.notes&&question?.notes!=='<p><br></p>'&&'text-font2'}`}>
                        
                        {question?.notes&&question?.notes!=='<p><br></p>'?<ion-icon name="copy-outline"></ion-icon>:<ion-icon name="add-circle-outline"></ion-icon>}
                    </span>
                    <span className='w-1/4 flex justify-center items-center text-2xl'><a href={question?.link} target='blank' className='flex justify-center items-center'><ion-icon name="code-working-outline"></ion-icon></a></span>
                    <span onClick={handleCompletedBtnClick} className={`w-1/4 flex justify-center items-center text-2xl hover:cursor-pointer ${question?.completed && 'text-green-400'}`}>{togglingCompleted ? <BeatLoaderComponent /> : question.completed ? <ion-icon name="checkbox-outline"></ion-icon> : <ion-icon name="square-outline"></ion-icon>}</span>
                    <span onClick={handleReviseBtnClick} className={`w-1/4 flex justify-center items-center text-2xl hover:cursor-pointer ${question?.revise && 'text-yellow-400'}`}>{togglingRevise ? <BeatLoaderComponent /> : <ion-icon name="star"></ion-icon>}</span>
                </div>
            </div>
        </div>
    )
}

export default Questions