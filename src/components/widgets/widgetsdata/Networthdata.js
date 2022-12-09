import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';

// TOTAL ASSETS - LIABILITIES
// (Savings + Investments + account + Cards ) - (loans + bills)
const Networthdata = () => {
  const { currentUser } = useContext(AuthContext);
  const [tbalance, setTbalance] = useState(null);

  const [acctsbalance, setAcctsbalance] = useState(null);
  const [cardsbalance, setCardsbalance] = useState(null);
  const [investsbalance, setInvestsbalance] = useState(null);
  const [savingsbalance, setSavingsbalance] = useState(null);

  const [loansbalance, setLoansbalance] = useState(null);
  const [billsbalance, setBillsbalance] = useState(null);


  const accountsRef = collection(db, 'users', currentUser.uid, 'accounts');
  const cardsRef = collection(db, 'users', currentUser.uid, 'cards');
  const investmentsRef = collection(db, 'users', currentUser.uid, 'investments');
  const savingsRef = collection(db, 'users', currentUser.uid, 'savings');

  const loansRef = collection(db, 'users', currentUser.uid, 'loans');
  const billsRef = collection(db, 'users', currentUser.uid, 'bills');


  useEffect(() => {
    const getNetworth = async () => {
      const acctsdata = await getDocs(accountsRef);
      const cardsdata = await getDocs(cardsRef);
      const investsdata = await getDocs(investmentsRef);
      const savingsdata = await getDocs(savingsRef);

      const loansdata = await getDocs(loansRef);
      const billsdata = await getDocs(billsRef);


      let accounts = acctsdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let acctstotal = 0;
      for (let balance of accounts) {
        acctstotal += parseInt(balance.openingbalance);
      }
      setAcctsbalance(acctstotal);
      

      let cards = cardsdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let cardstotal = 0;
      for (let balance of cards) {
        cardstotal += parseInt(balance.currentbalance);
      }
      setCardsbalance(cardstotal);

      let investments = investsdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let investstotal = 0;
      for (let balance of investments) {
        investstotal += parseInt(balance.amount);
      }
      setInvestsbalance(investstotal);


      let savings = savingsdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let savingstotal = 0;
      for (let balance of savings) {
        savingstotal += parseInt(balance.amount);
      }
      setSavingsbalance(savingstotal);


      let loans = loansdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let loanstotal = 0;
      for (let balance of loans) {
        loanstotal += parseInt(balance.loanamount);
      }
      setLoansbalance(loanstotal);


      let bills = billsdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let billstotal = 0;
      for (let balance of bills) {
        billstotal += parseInt(balance.amount);
      }
      setBillsbalance(billstotal);


      const networth = ((acctsbalance + cardsbalance + investsbalance + savingsbalance) - (loansbalance + billsbalance))
      setTbalance(networth);
    };
    getNetworth();
  }, [tbalance]);




  return (

    <div>
      <span style={{ fontSize: 22 }}>
        ${tbalance}
      </span>
    </div>
  )
}

export default Networthdata