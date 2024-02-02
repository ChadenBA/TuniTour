import { createSlice } from '@reduxjs/toolkit'

export const placesSlice = createSlice({

  name: "places",

  initialState: {
    Places: [],
    Categories: [],
    Activities: [],
    Cities: [],
    Rates: [],
    Agencies: [],
    comments: []
  },

  reducers: {
    setPlace(state, action) {
      state.Places = action.payload
    },
    setCategories(state, action) {
      state.Categories = action.payload
    },
    setActivities(state, action) {
      state.Activities = action.payload
    },
    setCities(state, action) {
      state.Cities = action.payload
    },
    setRate(state, action) {
      state.Rates = action.payload
    },
    setAgencies(state, action) {
      state.Agencies = action.payload
    },
    setComments(state, action) {
      state.comments = action.payload
    },

  }
})

export const { setPlace, setActivities, setCategories, setCities, setRate, setAgencies, setComments } = placesSlice.actions


export default placesSlice.reducer