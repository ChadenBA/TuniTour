import {createSlice} from '@reduxjs/toolkit'

const  passwordSlice = createSlice({
    name :"password",
    initialState:{
      isError:false,
    },
       
     reducers :{
        setError(state){
            state.isError=true;
        },
    
     },

})

const  passwordReducer=passwordSlice.reducer;
const passwordAction =passwordSlice.actions;
export {
    passwordAction,
    passwordReducer
}