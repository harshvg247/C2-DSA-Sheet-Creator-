import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import BeatLoaderComponent from './beatLoader';
function Editor({handleSaveNoteBtn, notes, savingNotes, toggleEditor}) {

    const [value, setValue] = useState(notes||'');

    return (
        <div className='fixed h-screen w-screen left-0 top-0 z-10 flex items-center justify-center before:h-full before:w-full before:bg-black before:fixed before:opacity-70 before:-z-10'>
            <div className='w-1/2 relative bg-secondary px-3 rounded-xl'>
                <div className='text-center m-4 text-2xl'>Save Notes</div>
                <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />
                <div className='m-3 text-lg flex gap-1 justify-end'><button onClick={toggleEditor} className='bg-red-600 rounded px-2'>Close</button><button onClick={()=>{handleSaveNoteBtn(value)}}className='bg-font2 rounded px-2'>{savingNotes?<BeatLoaderComponent/>:<>Save</>}</button></div>
            </div>
        </div>
    )
}

export default Editor