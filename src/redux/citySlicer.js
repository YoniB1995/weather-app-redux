import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {baseUrl} from '../services/weatherApi'

export const getCityByLocationKey = createAsyncThunk('city/getCityLocation', async (locationKey) => {
    return await fetch(`https://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=83yfOAJNfGjIHsfFSarM7IGmIH8W8KlS`).then((res)=> res.json()).then(data=> data)
});


const initialState = {
    cityDetails : {},
    isFavored:false,
    status:null
}


const citySlicer = createSlice({
    name:"cityDetails",
    initialState,
    reducers:{
        getCityDetails(state,action){
            state.cityDetails = action.payload
            }
        },
        ChangedToFavorite(state,action){
            state.isFavored = true;
            
        } ,
    extraReducers:{
        [getCityByLocationKey.pending] : (state, action) => {
            state.status = 'loading'
        },
        [getCityByLocationKey.fulfilled] : (state, {payload}) => {
            state.cityDetails = payload
            state.status = 'success'
        },
        [getCityByLocationKey.rejected] : (state, action) => {
            state.status = 'failed'
        },

    }
    });

export const { getCityDetails,ChangedToFavorite} =
  citySlicer.actions;

export default citySlicer.reducer;