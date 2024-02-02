import {createSlice} from '@reduxjs/toolkit'

export const  userSlice = createSlice({
    name :"admin",
    initialState:{value:{email:"", nom:"" , password:""}},
    //i need trhe reducer 
    //the reducer are les pure function js capable de modifier parties de  store
     reducers :{
        login : (state , action)=>{
            state.value =action.payload;
        }
     },

})
//les données a envoyer called payload  w tousel a travel l action 
//login va trasporter 2 chose (state et l'action)
export const{login}=userSlice.reducer;
export default userSlice.reducer;