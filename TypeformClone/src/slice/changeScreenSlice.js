import { createSlice } from '@reduxjs/toolkit';

export const changeScreenSlice = createSlice({
    name: 'screen',
    initialState: {
        screen: "loader",
        questionNumber: 0
    },
    reducers: {
        setScreen: (state, action) => {
            const { screenName } = action.payload;
            state.screen = screenName
        },
        setQuestionNumber: (state, action) => {
            const { number } = action.payload
            state.questionNumber = number
        },
        resetScreen: (state) => {
            state.screen = "homepage"
            state.questionNumber = 0
        },
    }
});

// this is for dispatch
export const { setScreen, setQuestionNumber, resetScreen } = changeScreenSlice.actions;

// this is for configureStore
export default changeScreenSlice.reducer;