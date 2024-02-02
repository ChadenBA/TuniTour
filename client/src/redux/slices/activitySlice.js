import {createSlice} from '@reduxjs/toolkit'

const  activitySlice = createSlice({
    name :"activity",
    initialState:{
        activities:[],
        loading:false,
        isActivityCreated:false,
        activity:null,
        activityCount:null,
    },
     reducers :{
        setActivities(state,action){
            state.activities=action.payload
        }, 
        setActivityCount(state,action){
            state.activityCount=action.payload
        },
        
        setLoading(state){
            state.loading=true;
        },
        setIsActivityCreated(state){
            state.isActivityCreated=true;
            state.loading=false;
        },
        clearLoading(state){
            state.loading=false;
        },
        clearIsActivityCreated(state){
            state.isActivityCreated=false; 
        },
        setActivity(state,action){
            state.activity=action.payload
        },
        deleteActivity(state, action) {
            state.activities = state.activities.filter(a => a._id !== action.payload);
          }
          
     },

})

const  activityReducer=activitySlice.reducer;
const activityAction =activitySlice.actions;
export {
   activityReducer,activityAction
}