import './rechart.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Heading } from '@chakra-ui/layout';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext'
import { selectCurrentMonthInvtotal, selectLast2MonthsInvtotal, selectLast3MonthsInvtotal, selectLast4MonthsInvtotal, selectLast5MonthsInvtotal, selectLastMonthInvtotal, setCurrentMonthInvtotal, setLast2MonthsInvtotal, setLast3MonthsInvtotal, setLast4MonthsInvtotal, setLast5MonthsInvtotal, setLastMonthInvtotal } from '../../redux/investSlice';
import { selectCurrentMonthSavtotal, selectLast2MonthsSavtotal, selectLast3MonthsSavtotal, selectLast4MonthsSavtotal, selectLast5MonthsSavtotal, selectLastMonthSavtotal, setCurrentMonthSavtotal, setLast2MonthsSavtotal, setLast3MonthsSavtotal, setLast4MonthsSavtotal, setLast5MonthsSavtotal, setLastMonthSavtotal } from '../../redux/savingsSlice';

const Rechart = ({ aspect, title }) => {
  const { currentUser, INITIAL_STATE } = useContext(AuthContext);
  const investRef = collection(db, 'users', currentUser.uid, 'investments');
  const savingsRef = collection(db, 'users', currentUser.uid, 'savings');
  
  const dispatch = useDispatch()
  const {currentMonth, lastMonth, last2Months, last3Months, last4Months, last5Months, today} = INITIAL_STATE;

  // STATE TO HOLD INV VALUES
  const currentMonthInvtotal = useSelector(selectCurrentMonthInvtotal);
  const lastMonthInvtotal = useSelector(selectLastMonthInvtotal);
  const last2MonthsInvtotal = useSelector(selectLast2MonthsInvtotal);
  const last3MonthsInvtotal = useSelector(selectLast3MonthsInvtotal);
  const last4MonthsInvtotal = useSelector(selectLast4MonthsInvtotal);
  const last5MonthsInvtotal = useSelector(selectLast5MonthsInvtotal);

  // STATE TO HOLD SAVINGS VALUES
  const currentMonthSavtotal = useSelector(selectCurrentMonthSavtotal);
  const lastMonthSavtotal = useSelector(selectLastMonthSavtotal);
  const last2MonthsSavtotal = useSelector(selectLast2MonthsSavtotal);
  const last3MonthsSavtotal = useSelector(selectLast3MonthsSavtotal);
  const last4MonthsSavtotal = useSelector(selectLast4MonthsSavtotal);
  const last5MonthsSavtotal = useSelector(selectLast5MonthsSavtotal);

 

  useEffect(() => {
    const getGraphData = async () => {
      
      // invest QUERY
      const currentMonthInvQuery = query(
        investRef,
        where('timeStamp', '<=', today),
        where('timeStamp', '>', currentMonth)
      );

      const lastMonthInvQuery = query(
        investRef,
        where('timeStamp', '<=', currentMonth),
        where('timeStamp', '>', lastMonth)
      );

      const last2MonthsInvQuery = query(
        investRef,
        where('timeStamp', '<=', lastMonth),
        where('timeStamp', '>', last2Months)
      );

      const last3MonthsInvQuery = query(
        investRef,
        where('timeStamp', '<=', last2Months),
        where('timeStamp', '>', last3Months)
      );

      const last4MonthsInvQuery = query(
        investRef,
        where('timeStamp', '<=', last3Months),
        where('timeStamp', '>', last4Months)
      );

      const last5MonthsInvQuery = query(
        investRef,
        where('timeStamp', '<=', last4Months),
        where('timeStamp', '>', last5Months)
      );


      // SAVINGS QUERY
      const currentMonthSavQuery = query(
        savingsRef,
        where('timeStamp', '<=', today),
        where('timeStamp', '>', currentMonth)
      );

      const lastMonthSavQuery = query(
        savingsRef,
        where('timeStamp', '<=', currentMonth),
        where('timeStamp', '>', lastMonth)
      );

      const last2MonthsSavQuery = query(
        savingsRef,
        where('timeStamp', '<=', lastMonth),
        where('timeStamp', '>', last2Months)
      );

      const last3MonthsSavQuery = query(
        savingsRef,
        where('timeStamp', '<=', last2Months),
        where('timeStamp', '>', last3Months)
      );

      const last4MonthsSavQuery = query(
        savingsRef,
        where('timeStamp', '<=', last3Months),
        where('timeStamp', '>', last4Months)
      );

      const last5MonthsSavQuery = query(
        savingsRef,
        where('timeStamp', '<=', last4Months),
        where('timeStamp', '>', last5Months)
      );

      // invest DATA
      const currentMonthInvData = await getDocs(currentMonthInvQuery);
      const lastMonthInvData = await getDocs(lastMonthInvQuery);
      const last2MonthsInvData = await getDocs(last2MonthsInvQuery);
      const last3MonthsInvData = await getDocs(last3MonthsInvQuery);
      const last4MonthsInvData = await getDocs(last4MonthsInvQuery);
      const last5MonthsInvData = await getDocs(last5MonthsInvQuery);

      // SAVINGS DATA
      const currentMonthSavData = await getDocs(currentMonthSavQuery);
      const lastMonthSavData = await getDocs(lastMonthSavQuery);
      const last2MonthsSavData = await getDocs(last2MonthsSavQuery);
      const last3MonthsSavData = await getDocs(last3MonthsSavQuery);
      const last4MonthsSavData = await getDocs(last4MonthsSavQuery);
      const last5MonthsSavData = await getDocs(last5MonthsSavQuery);

      
      // INV CURRENT MONTH
      let currentMonthinv = currentMonthInvData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let currentMonthinvtotal = 0;
      for (let balance of currentMonthinv) {
        currentMonthinvtotal += parseInt(balance.amount);
      }
      dispatch(
        setCurrentMonthInvtotal(currentMonthinvtotal)
      )
      // INV LAST MONTH
      let lastMonthinv = lastMonthInvData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let lastMonthinvtotal = 0;
      for (let balance of lastMonthinv) {
        lastMonthinvtotal += parseInt(balance.amount);
      }
      dispatch(
        setLastMonthInvtotal(lastMonthinvtotal)
      )
      // INV LAST 2 MONTHS
      let last2Monthsinv = last2MonthsInvData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last2Monthsinvtotal = 0;
      for (let balance of last2Monthsinv) {
        last2Monthsinvtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast2MonthsInvtotal(last2Monthsinvtotal)
      )
      // INV LAST 3 MONTHS
      let last3Monthsinv = last3MonthsInvData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last3Monthsinvtotal = 0;
      for (let balance of last3Monthsinv) {
        last3Monthsinvtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast3MonthsInvtotal(last3Monthsinvtotal)
      )
      // INV LAST 4 MONTHS
      let last4Monthsinv = last4MonthsInvData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last4Monthsinvtotal = 0;
      for (let balance of last4Monthsinv) {
        last4Monthsinvtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast4MonthsInvtotal(last4Monthsinvtotal)
      )
      // INV LAST 5 MONTHS
      let last5Monthsinv = last5MonthsInvData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last5Monthsinvtotal = 0;
      for (let balance of last5Monthsinv) {
        last5Monthsinvtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast5MonthsInvtotal(last5Monthsinvtotal)
      )


      // SAVINGS
      let currentMonthSav = currentMonthSavData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let currentMonthSavtotal = 0;
      for (let balance of currentMonthSav) {
        currentMonthSavtotal += parseInt(balance.amount);
      }
      dispatch(
        setCurrentMonthSavtotal(currentMonthSavtotal)
      )
      // Sav LAST MONTH
      let lastMonthSav = lastMonthSavData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let lastMonthSavtotal = 0;
      for (let balance of lastMonthSav) {
        lastMonthSavtotal += parseInt(balance.amount);
      }
      dispatch(
        setLastMonthSavtotal(lastMonthSavtotal)
      )
      // Sav LAST 2 MONTHS
      let last2MonthsSav = last2MonthsSavData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last2MonthsSavtotal = 0;
      for (let balance of last2MonthsSav) {
        last2MonthsSavtotal += parseInt(balance.amount);
      } 
      dispatch(
        setLast2MonthsSavtotal(last2MonthsSavtotal)
      )
      // Sav LAST 3 MONTHS
      let last3MonthsSav = last3MonthsSavData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last3MonthsSavtotal = 0;
      for (let balance of last3MonthsSav) {
        last3MonthsSavtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast3MonthsSavtotal(last3MonthsSavtotal)
      )
      // Sav LAST 4 MONTHS
      let last4MonthsSav = last4MonthsSavData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last4MonthsSavtotal = 0;
      for (let balance of last4MonthsSav) {
        last4MonthsSavtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast4MonthsSavtotal(last4MonthsSavtotal)
      )
      // Sav LAST 5 MONTHS
      let last5MonthsSav = last5MonthsSavData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      let last5MonthsSavtotal = 0;
      for (let balance of last5MonthsSav) {
        last5MonthsSavtotal += parseInt(balance.amount);
      }
      dispatch(
        setLast5MonthsSavtotal(last5MonthsSavtotal)
      )}
    getGraphData()
  }, [])

  const data = [
    {
      name: 'Month 1',
      investments: last5MonthsInvtotal,
      savings: last5MonthsSavtotal,
    },
    {
      name: 'Month 2',
      investments: last4MonthsInvtotal,
      savings: last4MonthsSavtotal,
    },
    {
      name: 'Month 3',
      investments: last3MonthsInvtotal,
      savings: last3MonthsSavtotal,
    },
    {
      name: 'Month 4',
      investments: last2MonthsInvtotal,
      savings: last2MonthsSavtotal,
    },
    {
      name: 'Month 5',
      investments: lastMonthInvtotal,
      savings: lastMonthSavtotal,
    },
    {
      name: 'Month 6',
      investments: currentMonthInvtotal,
      savings: currentMonthSavtotal,

    },
  ];

  return (
    <div className="rechart">
      <div className="recharthead">
        <Heading size="sm">{title}</Heading>
        <Heading size="sm" className='month'>
          <AddCircleOutlineRounded style={{ fontSize: "14px", marginRight: "5px" }} />
          6 Months</Heading>
      </div>

      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="savings"  fill="#8884d8"/>
        <Bar dataKey="investments" fill="#82ca9d" />
      </BarChart>

    </div>
  );
};

export default Rechart;
