import {createSlice} from '@reduxjs/toolkit'

const  profileSlice = createSlice({
    name :"profile",
    initialState:{
    profile:null,
    },
       
    //i need trhe reducer 
    //the reducer are les pure function js capable de modifier parties de  store
     reducers :{
        setProfile(state,action){
            state.profile=action.payload
        },
        setProfilePicture(state,action){
            state.profile.profilepicture=action.payload
        },
        updateProfile(state,action){
            state.profile=action.payload
        },
        
        updatepass(state,action){
            state.profile=action.payload
        },
        setemail(state,action){
            state.profile=action.payload
        },

     },

})
//les données a envoyer called payload  w tousel a travel l action 
//login va trasporter 2 chose (state et l'action)
const   profileReducer=profileSlice.reducer;
const profileAction =profileSlice.actions;
export {
    profileAction,
    profileReducer
}