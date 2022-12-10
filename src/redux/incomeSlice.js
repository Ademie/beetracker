import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // INCOME
    currentMonthInctotal: null,
    lastMonthInctotal: null,
    last2MonthsInctotal: null,
    last3MonthsInctotal: null,
    last4MonthsInctotal: null,
    last5MonthsInctotal: null,
}

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        // INCOME
        setCurrentMonthInctotal: (state, action) => {
            state.currentMonthInctotal = action.payload;
        },
        setLastMonthInctotal: (state, action) => {
            state.lastMonthInctotal = action.payload;
        },
        setLast2MonthsInctotal: (state, action) => {
            state.last2MonthsInctotal = action.payload
        },
        setLast3MonthsInctotal: (state, action) => {
            state.last3MonthsInctotal = action.payload
        },
        setLast4MonthsInctotal: (state, action) => {
            state.last4MonthsInctotal = action.payload
        },
        setLast5MonthsInctotal: (state, action) => {
            state.last5MonthsInctotal = action.payload
        },
    }
})

export const {
    setCurrentMonthInctotal, setLastMonthInctotal, setLast2MonthsInctotal, setLast3MonthsInctotal, setLast4MonthsInctotal, setLast5MonthsInctotal,
} = incomeSlice.actions;

// INCOME
export const selectCurrentMonthInctotal = (state) => state.income.currentMonthInctotal;
export const selectLastMonthInctotal = (state) => state.income.lastMonthInctotal;
export const selectLast2MonthsInctotal = (state) => state.income.last2MonthsInctotal;
export const selectLast3MonthsInctotal = (state) => state.income.last3MonthsInctotal;
export const selectLast4MonthsInctotal = (state) => state.income.last4MonthsInctotal;
export const selectLast5MonthsInctotal = (state) => state.income.last5MonthsInctotal;

export default incomeSlice.reducer;