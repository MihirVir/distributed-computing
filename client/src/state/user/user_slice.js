import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: "",
    name: "",
    email: "",
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setData(state, action) {
            state.id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
        },
        clearData(state, action) {
            state.id = ""
            state.name = ""
            state.email = ""
        }
    }
})


export const {
    setData,
    clearData
} = userSlice.actions;

export default userSlice.reducer;