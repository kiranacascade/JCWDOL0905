import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branchId: 0,
};

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    getBranchId: (state, action) => {
      state.branchId = action.payload.branchId;
    },
  },
});

export const { getBranchId } = branchSlice.actions;
export default branchSlice.reducer;
