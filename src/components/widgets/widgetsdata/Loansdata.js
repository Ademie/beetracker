import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';

const Loansdata = () => {
  const { currentUser } = useContext(AuthContext);
  const [tbalance, setTbalance] = useState(null);

  const loansRef = collection(db, 'users', currentUser.uid, 'loans');
  useEffect(() => {
    const getLoans = async () => {
      const data = await getDocs(loansRef);
      let loans = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let total = 0;
      for (let balance of loans) {
        total += parseInt(balance.loanamount);
      }
      setTbalance(total);
    };
    getLoans();
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

export default Loansdata