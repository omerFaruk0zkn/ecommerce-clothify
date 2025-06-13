import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/common/feature/get");

      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/common/feature/add", { image });

      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/feature/deleteFeatureImage",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/common/feature/delete/${id}`);

      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
