import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    pic: '',
};

export const activateSlice = createSlice({
    name: 'activate',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPic: (state, action) => {
            state.pic = action.payload;
        },
    },
});

export const { setName, setPic } = activateSlice.actions;

export default activateSlice.reducer;