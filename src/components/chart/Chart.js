import '../chart/chart.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Heading } from '@chakra-ui/layout';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';





const Chart = () => {
  const { currentUser } = useContext(AuthContext);
  const billsRef = collection(db, 'users', currentUser.uid, 'bills');
  const incomeRef = collection(db, 'users', currentUser.uid, 'income');

  // STATE TO HOLD BILLS VALUES
  const [currentMonthtotal, setCurrentMonthtotal] = useState(null);
  const [lastMonthtotal, setLastMonthtotal] = useState(null);
  const [last2Monthstotal, setLast2Monthstotal] = useState(null);
  const [last3Monthstotal, setLast3Monthstotal] = useState(null);
  const [last4Monthstotal, setLast4Monthstotal] = useState(null);
  const [last5Monthstotal, setLast5Monthstotal] = useState(null);

  // STATE TO HOLD INCOME VALUES
  const [currentMonthInctotal, setCurrentMonthInctotal] = useState(null);
  const [lastMonthInctotal, setLastMonthInctotal] = useState(null);
  const [last2MonthsInctotal, setLast2MonthsInctotal] = useState(null);
  const [last3MonthsInctotal, setLast3MonthsInctotal] = useState(null);
  const [last4MonthsInctotal, setLast4MonthsInctotal] = useState(null);
  const [last5MonthsInctotal, setLast5MonthsInctotal] = useState(null);



  useEffect(() => {
    const getGraphData = async () => {

      const today = new Date();
      const currentMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 2));
      const last2Months = new Date(new Date().setMonth(today.getMonth() - 3));
      const last3Months = new Date(new Date().setMonth(today.getMonth() - 4));
      const last4Months = new Date(new Date().setMonth(today.getMonth() - 5));
      const last5Months = new Date(new Date().setMonth(today.getMonth() - 6));


      // BILLS QUERY
      const currentMonthQuery = query(
        billsRef,
        where('timeStamp', '<=', today),
        where('timeStamp', '>', currentMonth)
      );

      const lastMonthQuery = query(
        billsRef,
        where('timeStamp', '<=', currentMonth),
        where('timeStamp', '>', lastMonth)
      );

      const last2MonthsQuery = query(
        billsRef,
        where('timeStamp', '<=', lastMonth),
        where('timeStamp', '>', last2Months)
      );

      const last3MonthsQuery = query(
        billsRef,
        where('timeStamp', '<=', last2Months),
        where('timeStamp', '>', last3Months)
      );

      const last4MonthsQuery = query(
        billsRef,
        where('timeStamp', '<=', last3Months),
        where('timeStamp', '>', last4Months)
      );

      const last5MonthsQuery = query(
        billsRef,
        where('timeStamp', '<=', last4Months),
        where('timeStamp', '>', last5Months)
      );


      // INCOME QUERY
      const currentMonthIncQuery = query(
        incomeRef,
        where('timeStamp', '<=', today),
        where('timeStamp', '>', currentMonth)
      );

      const lastMonthIncQuery = query(
        incomeRef,
        where('timeStamp', '<=', currentMonth),
        where('timeStamp', '>', lastMonth)
      );

      const last2MonthsIncQuery = query(
        incomeRef,
        where('timeStamp', '<=', lastMonth),
        where('timeStamp', '>', last2Months)
      );

      const last3MonthsIncQuery = query(
        incomeRef,
        where('timeStamp', '<=', last2Months),
        where('timeStamp', '>', last3Months)
      );

      const last4MonthsIncQuery = query(
        incomeRef,
        where('timeStamp', '<=', last3Months),
        where('timeStamp', '>', last4Months)
      );

      const last5MonthsIncQuery = query(
        incomeRef,
        where('timeStamp', '<=', last4Months),
        where('timeStamp', '>', last5Months)
      );

      // BILLS DATA
      const currentMonthData = await getDocs(currentMonthQuery);
      const lastMonthData = await getDocs(lastMonthQuery);
      const last2MonthsData = await getDocs(last2MonthsQuery);
      const last3MonthsData = await getDocs(last3MonthsQuery);
      const last4MonthsData = await getDocs(last4MonthsQuery);
      const last5MonthsData = await getDocs(last5MonthsQuery);

      // INCOME DATA
      const currentMonthIncData = await getDocs(currentMonthIncQuery);
      const lastMonthIncData = await getDocs(lastMonthIncQuery);
      const last2MonthsIncData = await getDocs(last2MonthsIncQuery);
      const last3MonthsIncData = await getDocs(last3MonthsIncQuery);
      const last4MonthsIncData = await getDocs(last4MonthsIncQuery);
      const last5MonthsIncData = await getDocs(last5MonthsIncQuery);


      // BILL CURRENT MONTH
      let currentMonthbills = currentMonthData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let currentMonthbillstotal = 0;
      for (let balance of currentMonthbills) {
        currentMonthbillstotal += parseInt(balance.amount);
      }
      setCurrentMonthtotal(currentMonthbillstotal)
      // BILL LAST MONTH
      let lastMonthbills = lastMonthData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let lastMonthbillstotal = 0;
      for (let balance of lastMonthbills) {
        lastMonthbillstotal += parseInt(balance.amount);
      }
      setLastMonthtotal(lastMonthbillstotal)
      // BILL LAST 2 MONTHS
      let last2Monthsbills = last2MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last2Monthsbillstotal = 0;
      for (let balance of last2Monthsbills) {
        last2Monthsbillstotal += parseInt(balance.amount);
      }
      setLast2Monthstotal(last2Monthsbillstotal)
      // BILL LAST 3 MONTHS
      let last3Monthsbills = last3MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last3Monthsbillstotal = 0;
      for (let balance of last3Monthsbills) {
        last3Monthsbillstotal += parseInt(balance.amount);
      }
      setLast3Monthstotal(last3Monthsbillstotal)
      // BILL LAST 4 MONTHS
      let last4Monthsbills = last4MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last4Monthsbillstotal = 0;
      for (let balance of last4Monthsbills) {
        last4Monthsbillstotal += parseInt(balance.amount);
      }
      setLast4Monthstotal(last4Monthsbillstotal)
      // BILL LAST 5 MONTHS
      let last5Monthsbills = last5MonthsData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last5Monthsbillstotal = 0;
      for (let balance of last5Monthsbills) {
        last5Monthsbillstotal += parseInt(balance.amount);
      }
      setLast5Monthstotal(last5Monthsbillstotal)





      // INC CURRENT MONTH
      let currentMonthInc = currentMonthIncData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let currentMonthIncometotal = 0;
      for (let balance of currentMonthInc) {
        currentMonthIncometotal += parseInt(balance.netamount);
      }
      setCurrentMonthInctotal(currentMonthIncometotal)
      // INC LAST MONTH
      let lastMonthInc = lastMonthIncData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let lastMonthIncometotal = 0;
      for (let balance of lastMonthInc) {
        lastMonthIncometotal += parseInt(balance.netamount);
      }
      setLastMonthInctotal(lastMonthIncometotal)
      // INC LAST 2 MONTHS
      let last2MonthsInc = last2MonthsIncData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last2MonthsIncometotal = 0;
      for (let balance of last2MonthsInc) {
        last2MonthsIncometotal += parseInt(balance.netamount);
      }
      setLast2MonthsInctotal(last2MonthsIncometotal)
      // INC LAST 3 MONTHS
      let last3MonthsInc = last3MonthsIncData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last3MonthsIncometotal = 0;
      for (let balance of last3MonthsInc) {
        last3MonthsIncometotal += parseInt(balance.netamount);
      }
      setLast3MonthsInctotal(last3MonthsIncometotal)
      // INC LAST 4 MONTHS
      let last4MonthsInc = last4MonthsIncData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last4MonthsIncometotal = 0;
      for (let balance of last4MonthsInc) {
        last4MonthsIncometotal += parseInt(balance.netamount);
      }
      setLast4MonthsInctotal(last4MonthsIncometotal)
      // INC LAST 5 MONTHS
      let last5MonthsInc = last5MonthsIncData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last5MonthsIncometotal = 0;
      for (let balance of last5MonthsInc) {
        last5MonthsIncometotal += parseInt(balance.netamount);
      }
      setLast5MonthsInctotal(last5MonthsIncometotal)


    }

    getGraphData()
  }, [])

  const data = [
    {
      name: 'Month 1',
      bills: last5Monthstotal,
      income: last5MonthsInctotal,
    },
    {
      name: 'Month 2',
      bills: last4Monthstotal,
      income: last4MonthsInctotal,
    },
    {
      name: 'Month 3',
      bills: last3Monthstotal,
      income: last3MonthsInctotal,
    },
    {
      name: 'Month 4',
      bills: last2Monthstotal,
      income: last2MonthsInctotal,
    },
    {
      name: 'Month 5',
      bills: lastMonthtotal,
      income: lastMonthInctotal,
    },
    {
      name: 'Month 6',
      bills: currentMonthtotal,
      income: currentMonthInctotal,

    },
  ];

  return (
    <div className="chart">
      <div className="charthead">
        <Heading size="sm">Finance Stats</Heading>
        <Heading size="sm" className='month'>
          <AddCircleOutlineRounded style={{ fontSize: "14px", marginRight: "5px" }} />
          Last 6 Months</Heading>
      </div>
      <ResponsiveContainer width="100%" aspect={2 / 1} className="chartBox">

        <LineChart
          width="auto"
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="rgba(46,82,176)" />
          <Line type="monotone" dataKey="bills" stroke="rgb(250, 163, 12)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
