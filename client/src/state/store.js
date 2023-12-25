import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./search/search_slice";

/*
    used for global state management
    
    action: Triggers event
    state: holds the data
    reducer: Modifies the state based on the triggered actions.

    Please Note:
        i) download redux devtool as an extension for better global state visualization
*/
export const store = configureStore({
    reducer: {
        search: searchReducer
    }
});