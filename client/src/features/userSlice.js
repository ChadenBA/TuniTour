import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({

    name: "user",

    initialState: {
        dataUser: {
            firstName: "",
            lastName: "",
            age: null,
            email: "",
            nationality: "",
            phone: null,
            photoProfile: null,
            password: "",
            visitedList: [],
            bucketList: [],
            adress: "",
            bio: ""
        },
        tokenUser: "",
        idUser: null,
        ratePlace: null
    },

    reducers: {
        userChangeValue: (state, action) => {
            state.dataUser = action.payload
        },
        userChangeToken: (state, action) => {
            state.tokenUser = action.payload
        },
        userChangeId: (state, action) => {
            state.idUser = action.payload
        },
        uploadPhoto: (state, action) => {
            state.dataUser.photoProfile = action.payload
        },
        updateProfile: (state, action) => {
            state.dataUser = action.payload
        },
        UpdateEmail: (state, action) => {
            state.dataUser.email = action.payload
        },
        setRateForOnePlace: (state, action) => {
            state.ratePlace = action.payload

        },
        setBucketList: (state, action) => {
            state.dataUser.bucketList = action.payload
        },
        setVisitedList: (state, action) => {
            state.dataUser.visitedList = action.payload
        }

    }
})

export const { userChangeValue, userChangeToken, userChangeId, uploadPhoto, updateProfile, UpdateEmail, setRateForOnePlace, setBucketList, setVisitedList } = userSlice.actions


export default userSlice.reducer