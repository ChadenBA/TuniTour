import {createSlice} from '@reduxjs/toolkit'

const  endroitSlice = createSlice({
    name :"endroit",
    initialState:{
    endroits:[],
    endroitCount:null,
    loading:false,
    endroitCategory:[],
    endroitActivity:[],
    city:"",
    isEndroitCreated:false,
    endroit:null,


    },
       
    //i need trhe reducer 
    //the reducer are les pure function js capable de modifier parties de  store
     reducers :{
        setEndroits(state,action){
            state.endroits=action.payload
        },
        setEndroitCount(state,action){
            state.endroitCount=action.payload
        },
        setEndroitCategory(state,action){
            state.endroitCategory=action.payload
        },
        
        setLoading(state){
            state.loading=true;
        },
        setIsEndroitCreated(state){
            state.isEndroitCreated=true;
            state.loading=false;
        },
        clearLoading(state){
            state.loading=false;
        },
        clearIsEndroitCreated(state){
            state.isEndroitCreated=false; 
        },
        setEndroit(state,action){
            state.endroit=action.payload
        },
        deleteEndroit(state,action){
            state.endroits.filter(a => a._id !== action.payload)
        }
       
     },

})
//les données a envoyer called payload  w tousel a travel l action 
//login va trasporter 2 chose (state et l'action)
const   endroitReducer=endroitSlice.reducer;
const endroitAction =endroitSlice.actions;
export {
    endroitAction,
    endroitReducer
}