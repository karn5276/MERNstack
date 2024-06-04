import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 show:false,
 shownavbar:true,
 name:"Pune"
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload
    },
    setName:(state,action)=>{
      state.name=action.payload
    },
    setShownavbar:(state,action)=>{
      state.shownavbar=action.payload
    }
    
  },
})

export const {
    setShow,
    setName,
    setShownavbar
} = searchSlice.actions

export default searchSlice.reducer