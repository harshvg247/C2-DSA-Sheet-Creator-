import React from 'react'
import logo from './../assets/c2logo.jpg'
import Category from './category'
import QuestionContainer from './questionContainer'
function MainSection() {

    function Title() {
        return (
            <div className='p-6 border-b-2 border-font2 flex'>
                <img src={logo} height={100} width={100}></img>
                <span className='ml-6'>
                <h1 className='text-5xl'>Coder's Cache</h1>
                <h2 className='text-xl mt-2 text-font3'>Where Every DSA Question Finds Its Place</h2>
                </span>
            </div>
        )
    }

    return (
        <>
            <Title />
            <QuestionContainer />
        </>
    )
}

export default MainSection