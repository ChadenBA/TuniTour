import {createSlice} from '@reduxjs/toolkit'

const  agencySlice = createSlice({
    name :"agency",
    initialState:{
        agencies:[],
     
        loading:false,
        isAgencyCreated:false,
        agency:null,
        agencyCount:null,
    },
     reducers :{
        setAgencies(state,action){
            state.agencies=action.payload
        }, setAgencyCount(state,action){
            state.agencyCount=action.payload
        },
        setLoading(state){
            state.loading=true;
        },
        setIsAgencyCreated(state){
            state.isAgencyCreated=true;
            state.loading=false;
        },
        clearLoading(state){
            state.loading=false;
        },
        clearIsAgencyCreated(state){
            state.isAgencyCreated=false; 
        },
        setAgency(state,action){
            state.agency=action.payload
        },
        deleteAgency(state,action){
            state.agencies.filter(a => a._id !== action.payload)
        }


     },

})

const  agencyReducer=agencySlice.reducer;
const agencyAction =agencySlice.actions;
export {
   agencyReducer,agencyAction
}