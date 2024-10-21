import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  questionBucket: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail: (state, actions) => {
      const { name, questionBucket } = actions.payload;
      state.name = name;
      state.questionBucket = questionBucket;
    },
    resetUser: (state) => {
      state.name = "";
      state.questionBucket = 0;
    },
  },
});

export const { setUserDetail,resetUser } = userSlice.actions;

export default userSlice.reducer;
