import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        fullScreen: true,
        type: "Loader",
    },
    reducers: {
        setModal: (state, action) => {
            const { type, fullScreen } = action.payload;
            state.type = type
            state.fullScreen = fullScreen
        },
        resetModal: (state) => {
            state.type = ""
            state.fullScreen = true
        }
    }
});

// this is for dispatch
export const { setModal, resetModal } = modalSlice.actions;

// this is for configureStore
export default modalSlice.reducer;