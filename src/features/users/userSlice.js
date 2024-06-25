import { createSlice } from '@reduxjs/toolkit';


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

      const findCategory = state.categories.find(cat => cat.name === category);
      if (findCategory) {
        const findSubCategory = findCategory.subCategories.find(subCat => subCat.name === subCategory);
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
      const cat = state.categories.find((cat)=>cat.name==category);
      const subCat = cat.subCategories.find((subCat)=>subCat.name==subCategory);
      const question = subCat.questions.find((question)=>question.title==question_title);
      question.revise = !question.revise;
    },
    toggleCompleted: (state, action) => {
      const { category, subCategory, question_title } = action.payload;
      const cat = state.categories.find((cat)=>cat.name==category);
      const subCat = cat.subCategories.find((subCat)=>subCat.name==subCategory);
      const question = subCat.questions.find((question)=>question.title==question_title);
      question.completed = !question.completed;
    },
    saveNotes: (state, action) => {
      const { category, subCategory, question_title, notes } = action.payload;
      const cat = state.categories.find((cat)=>cat.name==category);
      const subCat = cat.subCategories.find((subCat)=>subCat.name==subCategory);
      const question = subCat.questions.find((question)=>question.title==question_title);
      question.notes = notes;
    }

  },
});

export const { setUserInfo, clearUserInfo, addQuestion, toggleRevise, toggleCompleted, saveNotes } = userSlice.actions;
export default userSlice.reducer;