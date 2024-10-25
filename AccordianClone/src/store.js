import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./Reducers/pageReducer";
import userReducer from "./Reducers/userReducer";
import questionReducer from "./Reducers/questionReducer";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    question: questionReducer,
  },
});
