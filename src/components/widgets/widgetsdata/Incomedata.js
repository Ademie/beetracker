import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';

const Incomedata = () => {
  const { currentUser } = useContext(AuthContext);
  const [tbalance, setTbalance] = useState(null);
  
  const incomeRef = collection(db, "users", currentUser.uid, "income");
  useEffect(() => {
    const getIncome = async () => {
      const data = await getDocs(incomeRef);
      let income = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let total = 0;
      for (let balance of income) {
        total += parseInt(balance.netamount);
      }
      setTbalance(total);
    };
    getIncome();
  }, []);
  return (
    <div>
      {/* <span style={{ fontSize: 20 }}>$</span> */}
      <span style={{ fontSize: 22 }}>
        ${tbalance}
      </span>
    </div>
  )
}

export default Incomedata