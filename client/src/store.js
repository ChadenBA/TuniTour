import { configureStore, combineReducers } from '@reduxjs/toolkit'
import loginSlice from "./features/loginSlice"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import userSlice from './features/userSlice'
import placesSlice from "./features/PlaceSlice"

import { authReducer } from './redux/slices/authslice'
import { passwordReducer } from './redux/slices/paswordSlice';
import { endroitReducer } from './redux/slices/endroitSlice';
import { profileReducer } from './redux/slices/profile.slice';
import { categoryReducer } from './redux/slices/categorySlice';
import { cityReducer } from './redux/slices/citySlice';
import { activityReducer } from './redux/slices/activitySlice';
import { agencyReducer } from './redux/slices/agencySlice';
//store et un constante qui va store les donnees partagee




const persistConfig = {
    key: "root",
    version: 2, // Increment the version number
    storage,
};


const reducer = combineReducers({
    login: loginSlice,
    user: userSlice,
    place: placesSlice,
    auth: authReducer,
    profile: profileReducer,
    endroit: endroitReducer,
    category: categoryReducer,
    city: cityReducer,
    activity: activityReducer,
    agency: agencyReducer,
    password: passwordReducer,
})

const persisteReducer = persistReducer(persistConfig, reducer)


const store = configureStore({
    reducer: persisteReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),



})


export default store