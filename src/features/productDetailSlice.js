import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  products:null,
  visibility:{}
};



export const productDetailSlice = createSlice({
  name: 'productList',
  initialState,
 
  reducers: {
    openProductDetail:(state,action)=>{
      state.products = action.payload;
    },
     toggleVisibity(state,action){
      const {itemId}= action.payload;
      state.visibility[itemId] = !state.visibility[itemId];
     }
  },

});

export const { openProductDetail,toggleVisibity} = productDetailSlice.actions;
export const selectProductDetail = (state) => state.productDetail.products;
export const selectVisibility= (state) => state.productDetail.visibility;
export default productDetailSlice.reducer;
