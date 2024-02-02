import {createSlice} from '@reduxjs/toolkit'

const  authSlice = createSlice({
    name :"auth",
    initialState:{
        admin:localStorage.getItem("admininfo") ?
        JSON.parse(localStorage.getItem("admininfo")):null,},
        isEmailVerified:false,
    //i need trhe reducer 
    //the reducer are les pure function js capable de modifier parties de  store
     reducers :{
        login : (state , action)=>{
            state.admin=action.payload;
        },
        logout : (state , action)=>{
            state.admin=null;
        },
        setAdminPicture(state,action){
               state.admin.profilepicture=action.payload;
        },
    
        setAdminname(state,action){
            state.admin.adminname=action.payload
        },
        setIsemail(state){
            state.isEmailVerified=true;
        }, 
        
  

     },

})
//les données a envoyer called payload  w tousel a travel l action 
//login va trasporter 2 chose (state et l'action)
const authReducer=authSlice.reducer;
const authAction =authSlice.actions;
export {
    authAction,
    authReducer
}