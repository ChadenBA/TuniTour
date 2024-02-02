import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({

    name: "login",

    initialState: {
        value: false,
    },

    reducers: {
        loginChangeValue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { loginChangeValue } = loginSlice.actions


export default loginSlice.reducer