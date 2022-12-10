import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // INVESTMENT
    currentMonthInvtotal: null,
    lastMonthInvtotal: null,
    last2MonthsInvtotal: null,
    last3MonthsInvtotal: null,
    last4MonthsInvtotal: null,
    last5MonthsInvtotal: null,

}

const investSlice = createSlice({
    name: 'invest',
    initialState,
    reducers: {
        // INVESTMENTS
        setCurrentMonthInvtotal: (state, action) => {
            state.currentMonthInvtotal = action.payload;
        },
        setLastMonthInvtotal: (state, action) => {
            state.lastMonthInvtotal = action.payload;
        },
        setLast2MonthsInvtotal: (state, action) => {
            state.last2MonthsInvtotal = action.payload
        },
        setLast3MonthsInvtotal: (state, action) => {
            state.last3MonthsInvtotal = action.payload
        },
        setLast4MonthsInvtotal: (state, action) => {
            state.last4MonthsInvtotal = action.payload
        },
        setLast5MonthsInvtotal: (state, action) => {
            state.last5MonthsInvtotal = action.payload
        },

    }
})


export const {
    
    setCurrentMonthInvtotal, setLastMonthInvtotal, setLast2MonthsInvtotal, setLast3MonthsInvtotal, setLast4MonthsInvtotal, setLast5MonthsInvtotal,
   
} = investSlice.actions;


// INVESTMENTS
export const selectCurrentMonthInvtotal = (state) => state.invest.currentMonthInvtotal;
export const selectLastMonthInvtotal = (state) => state.invest.lastMonthInvtotal;
export const selectLast2MonthsInvtotal = (state) => state.invest.last2MonthsInvtotal;
export const selectLast3MonthsInvtotal = (state) => state.invest.last3MonthsInvtotal;
export const selectLast4MonthsInvtotal = (state) => state.invest.last4MonthsInvtotal;
export const selectLast5MonthsInvtotal = (state) => state.invest.last5MonthsInvtotal;

export default investSlice.reducer;