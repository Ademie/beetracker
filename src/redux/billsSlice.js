import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentMonthtotal: null,
    lastMonthtotal: null,
    last2Monthstotal: null,
    last3Monthstotal: null,
    last4Monthstotal: null,
    last5Monthstotal: null,
}

const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        setCurrentMonthtotal: (state, action) => {
            state.currentMonthtotal = action.payload;
        },
        setLastMonthtotal: (state, action) => {
            state.lastMonthtotal = action.payload;
        },
        setLast2Monthstotal: (state, action) => {
            state.last2Monthstotal = action.payload
        },
        setLast3Monthstotal: (state, action) => {
            state.last3Monthstotal = action.payload
        },
        setLast4Monthstotal: (state, action) => {
            state.last4Monthstotal = action.payload
        },
        setLast5Monthstotal: (state, action) => {
            state.last5Monthstotal = action.payload
        },
    }
})

export const {
    setCurrentMonthtotal, setLastMonthtotal, setLast2Monthstotal, setLast3Monthstotal, setLast4Monthstotal, setLast5Monthstotal,
} = billsSlice.actions;

export const selectCurrentMonthtotal = (state) => state.bills.currentMonthtotal;
export const selectLastMonthtotal = (state) => state.bills.lastMonthtotal;
export const selectLast2Monthstotal = (state) => state.bills.last2Monthstotal;
export const selectLast3Monthstotal = (state) => state.bills.last3Monthstotal;
export const selectLast4Monthstotal = (state) => state.bills.last4Monthstotal;
export const selectLast5Monthstotal = (state) => state.bills.last5Monthstotal;

export default billsSlice.reducer;