import { createSlice } from '@reduxjs/toolkit';
import Subcategory from '../../components/subcategory';

const initialState = {
  name: '',
  email: '',
  categories: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.categories = action.payload.categories;
    },
    clearUserInfo: (state) => {
      state.name = '';
      state.email = '';
      state.categories = [];
    },
    addQuestion: (state, action) => {
      const { category, subCategory, title, link } = action.payload;
      const findCategory = state.categories.find(cat => cat.name.toLowerCase() === category.toLowerCase());
      if (findCategory) {
        const findSubCategory = findCategory.subCategories.find(subCat => subCat.name.toLowerCase() === subCategory.toLowerCase());
        if (findSubCategory) {
          findSubCategory.questions.push({
            title: title,
            link: link,
          });
        } else {
          findCategory.subCategories.push({
            name: subCategory,
            questions: [{
              title: title,
              link: link,
            }]
          });
        }
      } else {
        state.categories.push({
          name: category,
          subCategories: [{
            name: subCategory,
            questions: [{
              title: title,
              link: link,
            }]
          }]
        });
      }
    },
    toggleRevise: (state, action) => {
      const { category, subCategory, question_title } = action.payload;
      const cat = state.categories.find((cat) => cat.name == category);
      const subCat = cat.subCategories.find((subCat) => subCat.name == subCategory);
      const question = subCat.questions.find((question) => question.title == question_title);
      question.revise = !question.revise;
    },
    toggleCompleted: (state, action) => {
      const { category, subCategory, question_title } = action.payload;
      const cat = state.categories.find((cat) => cat.name == category);
      const subCat = cat.subCategories.find((subCat) => subCat.name == subCategory);
      const question = subCat.questions.find((question) => question.title == question_title);
      question.completed = !question.completed;
    },
    saveNotes: (state, action) => {
      const { category, subCategory, question_title, notes } = action.payload;
      const cat = state.categories.find((cat) => cat.name == category);
      const subCat = cat.subCategories.find((subCat) => subCat.name == subCategory);
      const question = subCat.questions.find((question) => question.title == question_title);
      question.notes = notes;
    },
    deleteQuestion: (state, action) => {
      const { category, subCategory, title } = action.payload;
      const cat = state.categories.find((cat) => cat.name == category);
      const subCat = cat.subCategories.find((subCat) => subCat.name == subCategory);
      subCat.questions.splice(subCat.questions.findIndex(question => question.title == title), 1);
    },
    deleteSubCategory: (state, action) => {
      const { category, subCategory} = action.payload;
      const cat = state.categories.find((cat) => cat.name == category);
      cat.subCategories.splice(cat.subCategories.indexOf(subCategory), 1);
    },
    deleteCategory: (state, action) => {
      const { category } = action.payload;
      const index = state.categories.findIndex((c) => c.name === category);
      // state.categories.slice(state.categories.indexOf(cat), 1);  
      state.categories.splice(index, 1);  
    }
  },
});

export const { setUserInfo, clearUserInfo, addQuestion, toggleRevise, toggleCompleted, saveNotes, deleteQuestion, deleteSubCategory, deleteCategory } = userSlice.actions;
export default userSlice.reducer;