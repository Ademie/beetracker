import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const today = new Date()
const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    today: new Date(),
    currentMonth: new Date(new Date().setMonth(today.getMonth() - 1)),
    lastMonth: new Date(new Date().setMonth(today.getMonth() - 2)),
    last2Months: new Date(new Date().setMonth(today.getMonth() - 3)),
    last3Months: new Date(new Date().setMonth(today.getMonth() - 4)),
    last4Months: new Date(new Date().setMonth(today.getMonth() - 5)),
    last5Months: new Date(new Date().setMonth(today.getMonth() - 6)),
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    // STORE USER IN LOCAL STORAGE 
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser])


    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch, INITIAL_STATE }}>
            {children}
        </AuthContext.Provider>
    )
}