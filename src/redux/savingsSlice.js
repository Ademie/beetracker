import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentMonthSavtotal: null,
    lastMonthSavtotal: null,
    last2MonthsSavtotal: null,
    last3MonthsSavtotal: null,
    last4MonthsSavtotal: null,
    last5MonthsSavtotal: null,
}

const savingsSlice = createSlice({
    name: 'savings',
    initialState,
    reducers: {
        setCurrentMonthSavtotal: (state, action) => {
            state.currentMonthSavtotal = action.payload;
        },
        setLastMonthSavtotal: (state, action) => {
            state.lastMonthSavtotal = action.payload;
        },
        setLast2MonthsSavtotal: (state, action) => {
            state.last2MonthsSavtotal = action.payload
        },
        setLast3MonthsSavtotal: (state, action) => {
            state.last3MonthsSavtotal = action.payload
        },
        setLast4MonthsSavtotal: (state, action) => {
            state.last4MonthsSavtotal = action.payload
        },
        setLast5MonthsSavtotal: (state, action) => {
            state.last5MonthsSavtotal = action.payload
        },
    }
})

export const {
    setCurrentMonthSavtotal, setLastMonthSavtotal, setLast2MonthsSavtotal, setLast3MonthsSavtotal, setLast4MonthsSavtotal, setLast5MonthsSavtotal,
} = savingsSlice.actions;

export const selectCurrentMonthSavtotal = (state) => state.savings.currentMonthSavtotal;
export const selectLastMonthSavtotal = (state) => state.savings.lastMonthSavtotal;
export const selectLast2MonthsSavtotal = (state) => state.savings.last2MonthsSavtotal;
export const selectLast3MonthsSavtotal = (state) => state.savings.last3MonthsSavtotal;
export const selectLast4MonthsSavtotal = (state) => state.savings.last4MonthsSavtotal;
export const selectLast5MonthsSavtotal = (state) => state.savings.last5MonthsSavtotal;

export default savingsSlice.reducer;