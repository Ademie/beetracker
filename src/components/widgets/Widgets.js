import React, { useContext, useEffect, useState } from 'react';
import { BsShieldShaded } from 'react-icons/bs';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { AiFillDownCircle, AiFillUpCircle } from 'react-icons/ai';
import '../widgets/widgets.scss';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Networthdata from './widgetsdata/Networthdata';
import Loansdata from './widgetsdata/Loansdata';
import Billsdata from './widgetsdata/Billsdata';
import { AuthContext } from '../../context/AuthContext';
import Incomedata from './widgetsdata/Incomedata';


// https://www.youtube.com/watch?v=eW5MdE3ZcAw

let data;
function Widgets({ type }) {
  const { currentUser } = useContext(AuthContext);
  const [diff, setDiff] = useState(null);

  switch (type) {
    case 'networth':
      data = {
        counter: 'NETWORTH',
        isMoney: true,
        networth: true,
        link: 'Networth',
        query: 'networth',
        icon: (
          <BsShieldShaded
            className="widIcon"
            style={{ backgroundColor: 'gray' }}
          />
        ),
      };
      break;

    case 'bills':
      data = {
        counter: 'BILLS',
        isMoney: true,
        bill: true,
        link: 'Bills',
        query: 'bills',
        icon: (
          <GiMoneyStack
            className="widIcon"
            style={{ backgroundColor: 'rgb(250, 163, 12)' }}
          />
        ),
      };
      break;
    case 'income':
      data = {
        counter: 'INCOME',
        isMoney: true,
        income: true,
        link: 'Income',
        query: 'income',
        icon: (
          <GiMoneyStack
            className="widIcon"
            style={{ backgroundColor: 'rgb(46,82,176)' }}
          />
        ),
      };
      break;
    case 'loans':
      data = {
        counter: 'LOANS',
        isMoney: true,
        loan: true,
        link: 'Loans',
        query: 'loans',
        icon: (
          <GiTakeMyMoney
            className="widIcon"
            style={{ backgroundColor: 'rgb(250, 52, 12)' }}
          />
        ),
      };
      break;
    default:
      break;
  }


  // const [billsbalance, setBillsbalance] = useState(null);
  // const billsRef = collection(db, 'users', currentUser.uid, 'bills');


  // useEffect(() => {
  //   const getBills = async () => {

  //     const today = new Date();
  //     const currentMonth = new Date(new Date().setMonth(today.getMonth() - 1));
  //     const lastMonth = new Date(new Date().setMonth(today.getMonth() - 2));
  //     const last2Months = new Date(new Date().setMonth(today.getMonth() - 3));
  //     const last3Months = new Date(new Date().setMonth(today.getMonth() - 4));
  //     const last4Months = new Date(new Date().setMonth(today.getMonth() - 5));
  //     const last5Months = new Date(new Date().setMonth(today.getMonth() - 6));


  //     const currentMonthQuery = query(
  //       billsRef,
  //       where('timeStamp', '<=', today),
  //       where('timeStamp', '>', currentMonth)
  //     );

  //     const lastMonthQuery = query(
  //       collection(db, "users", currentUser.uid, "bills"),
  //       where('timeStamp', '<=', currentMonth),
  //       where('timeStamp', '>', lastMonth)
  //     );

  //     const last2MonthsQuery = query(
  //       collection(db, "users", currentUser.uid, "bills"),
  //       where('timeStamp', '<=', lastMonth),
  //       where('timeStamp', '>', last2Months)
  //     );

  //     const last3MonthsQuery = query(
  //       collection(db, "users", currentUser.uid, "bills"),
  //       where('timeStamp', '<=', last2Months),
  //       where('timeStamp', '>', last3Months)
  //     );

  //     const last4MonthsQuery = query(
  //       collection(db, "users", currentUser.uid, "bills"),
  //       where('timeStamp', '<=', last3Months),
  //       where('timeStamp', '>', last4Months)
  //     );

  //     const last5MonthsQuery = query(
  //       collection(db, "users", currentUser.uid, "bills"),
  //       where('timeStamp', '<=', last4Months),
  //       where('timeStamp', '>', last5Months)
  //     );

  //     const currentMonthData = await getDocs(currentMonthQuery);
  //     const lastMonthData = await getDocs(lastMonthQuery);
  //     const last2MonthsData = await getDocs(last2MonthsQuery);
  //     const last3MonthsData = await getDocs(last3MonthsQuery);
  //     const last4MonthsData = await getDocs(last4MonthsQuery);
  //     const last5MonthsData = await getDocs(last5MonthsQuery);

  //     // CURRENT MONTH
  //     let currentMonthbills = currentMonthData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //     let currentMonthbillstotal = 0;
  //     for (let balance of currentMonthbills) {
  //       currentMonthbillstotal += parseInt(balance.amount);
  //     }
  //     // LAST MONTH
  //     let lastMonthbills = lastMonthData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //     let lastMonthbillstotal = 0;
  //     for (let balance of lastMonthbills) {
  //       lastMonthbillstotal += parseInt(balance.amount);
  //     }
  //     // LAST 2 MONTHS
  //     let last2Monthsbills = last2MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //     let last2Monthsbillstotal = 0;
  //     for (let balance of last2Monthsbills) {
  //       last2Monthsbillstotal += parseInt(balance.amount);
  //     }
  //     // LAST 3 MONTHS
  //     let last3Monthsbills = last3MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //     let last3Monthsbillstotal = 0;
  //     for (let balance of last3Monthsbills) {
  //       last3Monthsbillstotal += parseInt(balance.amount);
  //     }
  //     // LAST 4 MONTHS
  //     let last4Monthsbills = last4MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //     let last4Monthsbillstotal = 0;
  //     for (let balance of last4Monthsbills) {
  //       last4Monthsbillstotal += parseInt(balance.amount);
  //     }
  //     // LAST 5 MONTHS
  //     let last5Monthsbills = last5MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  //     let last5Monthsbillstotal = 0;
  //     for (let balance of last5Monthsbills) {
  //       last5Monthsbillstotal += parseInt(balance.amount);
  //     }
  //   }

  //   getBills()
  // }, [])

  return (
    <div className="widget">
      <div className="left">
        {data.icon}
        <span className="counter">
          {data.networth && <Networthdata />}
          {data.income && <Incomedata/>}
          {data.bill && <Billsdata />}
          {data.loan && <Loansdata />}

        </span>
        <div className={`percentage ${diff < 0 ? 'negative' : 'positive'}`}>
          {diff < 0 ? <AiFillDownCircle /> : <AiFillUpCircle />}
          {/* {billsbalance} */}
        </div>
      </div>
      <div className="basetag">
        <center>
          <span className="baselink">{data.link}</span>
        </center>
      </div>
    </div>
  );
}

export default Widgets;
