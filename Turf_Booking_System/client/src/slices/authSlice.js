import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    isOwner:false
}

const authSlice =createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
        setToken(state,value){
            state.token=value.payload
        },
        setIsOwner(state,value){
            state.isOwner=value.payload
        }
    }
});

export const {setToken,setLoading,setSignupData,setIsOwner}=authSlice.actions;
export default authSlice.reducer;