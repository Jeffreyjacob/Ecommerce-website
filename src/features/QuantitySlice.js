import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    count: 1,
    footerSectionsToggle:{}
}

export const QuantitySlice = createSlice({
    name:"count",
    initialState,

    reducers:{
        quantityIncrement:(state)=>{
            state.count ++;
        },
        quantityDecrement:(state)=>{
           if(state.count > 1){
             state.count --;
           }
        },
        quantityReset:(state)=>{
           state.count = 1
        },
        FooterToggle:(state,action)=>{
          const {itemId} = action.payload
          state.footerSectionsToggle[itemId] = !state.footerSectionsToggle[itemId];
        }
    }
});

export const {quantityIncrement,quantityDecrement,quantityReset,FooterToggle} = QuantitySlice.actions;
export const SelectQuantity = (state) => state.counts.count;
export const selectFooterToggle = (state)=>state.counts.footerSectionsToggle;
export default QuantitySlice.reducer;