// QuestionContainer component is responsible for rendering a list of categories.
// It uses the 'useSelector' hook from 'react-redux' to fetch the list of categories from the Redux store.
// If the list is not empty, it maps through each category and renders a Category component.

import React, { useRef, useState } from 'react'
import Category from './category';
import { useSelector } from 'react-redux';
import { logRoles } from '@testing-library/react';


function QuestionContainer() {

    const categories = useSelector((state) => state.user.categories);
    return (
        <>
            {categories.length ?
                (categories.map((category) => {
                    return (
                        <Category category={category} />
                    )
                })) : <div>No question added</div>
            }
        </>
    )
}

export default QuestionContainer;