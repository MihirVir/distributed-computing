import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * contains all the search data 
 * refer to store for details
 */
export const fetchData = createAsyncThunk(
    "searchSlice/fetchData",
    async () => {
        try {
            const res = await axios.get("/api/v1/flight-routes-service/countries");
            return res.data;
        } catch (err) {
            throw err;
        }
    }
)

export const submitForm = createAsyncThunk(
    "searchSlice/submitForm",
    async ({id, source, destination, history}) => {
        try {
            const res = await axios.get("/api/v1/flight-routes-service/flight_routes", {
                params: {
                    src: source,
                    dest: destination,
                    user_id: id
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            history("/results");   
            return res.data;
        } catch (err) {
            throw err;
        }
    }
);

const initialState = {
    selected: "one",
    loading: false,
    error: null,
    round: false,
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    from: "",
    to: "",
    fromResults: [],
    toResults: [],
    results: [],
    searchResults: [],
    searchLoading: false,
    searchError: null,
    fromResultsActive: false,
    toResultsActive: false,
};

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        setSelected(state, action) {
            state.selected = action.payload;
            state.round = action.payload === "round";
        },
        setStart(state, action) {
            state.start = new Date(action.payload);
        },
        setEnd(state, action) {
            state.end = new Date(action.payload);
        },
        setFrom(state, action) {
            state.from = action.payload;
        },
        setTo(state, action) {
            state.to = action.payload;
        },
        setFromResults(state, action) {
            state.fromResults = action.payload;
        },
        setToResults(state, action) {
            state.toResults = action.payload;
        },
        clearFromResults(state, action) {
            state.fromResults = []
        },
        clearToResults(state, action) {
            state.toResults = []
        },
        setFromResultsActive(state, action) {
            state.fromResultsActive = action.payload;
        },
        setToResultsActive(state, action) {
          state.toResultsActive = action.payload;  
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.results = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(submitForm.pending, (state, action) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(submitForm.fulfilled, (state,action) => {
                state.searchLoading = false;
                state.error = null;
                state.searchResults = action?.payload;
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message;
            });
    }
});

export const {
    setSelected,
    setStart,
    setEnd,
    setFrom,
    setTo,
    setFromResults,
    setToResults,
    setResults,
    clearFromResults,
    clearToResults,
    setFromResultsActive,
    setToResultsActive
} = searchSlice.actions;

export default searchSlice.reducer;