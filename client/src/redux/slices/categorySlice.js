import {createSlice} from '@reduxjs/toolkit'

const  categorySlice = createSlice({
    name :"category",
    initialState:{
        categories:[],
        loading:false,
        isCategoryCreated:false,
        category:null,
    },
     reducers :{
        setCategories(state,action){
            state.categories=action.payload
        },
        setLoading(state){
            state.loading=true;
        },
        setIsCategoryCreated(state){
            state.isCategoryCreated=true;
            state.loading=false;
        },
        clearLoading(state){
            state.loading=false;
        },
        clearIsCategoryCreated(state){
            state.isCategoryCreated=false; 
        },
        setCategory(state,action){
            state.category=action.payload
        },
        deleteCategory(state,action){
            state.categories.filter(a => a._id !== action.payload)
        }


     },

})

const  categoryReducer=categorySlice.reducer;
const categoryAction =categorySlice.actions;
export {
    categoryAction,
    categoryReducer
}