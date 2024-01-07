import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        UserLogin:(state,action)=>{
            state.user = action.payload;
        },
        UserLogout:(state)=>{
            state.user = null;
        }

    }
})

export const {UserLogin,UserLogout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;