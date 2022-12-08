import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';

const Billsdata = () => {
  const { currentUser } = useContext(AuthContext);
  const [tbalance, setTbalance] = useState(null);
  
  const billsRef = collection(db, "users", currentUser.uid, "bills");
  useEffect(() => {
    const getBills = async () => {
      const data = await getDocs(billsRef);
      let bills = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.log('bills', bills)
      let total = 0;
      for (let balance of bills) {
        total += parseInt(balance.amount);
      }
      setTbalance(total);
    };
    getBills();
  }, []);
  return (
    <div>
      <sup style={{ fontSize: 20 }}>$</sup>
      <span style={{ fontSize: 22 }}>
        {tbalance}
      </span>
    </div>
  )
}

export default Billsdata