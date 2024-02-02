import {createSlice} from '@reduxjs/toolkit'

const  citySlice = createSlice({
    name :"city",
    initialState:{
        cities:[],
        loading:false,
        activity:[],
        endroit:[],
        isCityCreated:false,
        city:null,
    },
     reducers :{
        setCities(state,action){
            state.cities=action.payload
        },
        setLoading(state){
            state.loading=true;
        },
        setIsCityCreated(state){
            state.isCityCreated=true;
            state.loading=false;
        },
        clearLoading(state){
            state.loading=false;
        },
        clearIsCityCreated(state){
            state.isCityCreated=false; 
        },
        setCity(state,action){
            state.city=action.payload
        },
        deleteCity(state,action){
            state.cities.filter(a => a._id !== action.payload)
        }


     },

})

const  cityReducer=citySlice.reducer;
const cityAction =citySlice.actions;
export {
    cityAction,
    cityReducer
}