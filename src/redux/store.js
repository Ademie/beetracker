import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "./billsSlice";
import incomeReducer from "./incomeSlice";
import savingsReducer from "./savingsSlice";
import investReducer from "./investSlice";


const store = configureStore({
    reducer: {
        bills: billsReducer,
        income: incomeReducer,
        savings: savingsReducer,
        invest: investReducer,
    }
})

export default store;