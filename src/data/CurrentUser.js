import { collection } from "firebase/firestore"
import { forwardRef, useContext, useRef, useImperativeHandle, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { db } from "../firebase"

const CurrentUser = forwardRef((props, ref) => {
    const [userID, setUserID] = useState(false)
     const {currentUser} = useContext(AuthContext)
     
// If there's a user then get his uid
    useImperativeHandle(ref, ()=>({
        userFunction(){
            {currentUser && setUserID(currentUser.uid)}
            
        }
    }))

})

export default CurrentUser

// export const accountsRef = () => collection(db, "users", "accounts")
export const AccountsRef = () => {
    const userRef = useRef(null)
    const userIdRef = userRef.current.userFunction()
    return (
         collection(db, "users", userIdRef, "accounts"),
         <CurrentUser ref={userRef}/>
    )

}

