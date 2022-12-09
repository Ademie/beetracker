import { Heading } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import '../investments/investments.scss';
import {  MoreVertSharp } from '@material-ui/icons';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { CalendarIcon } from '@chakra-ui/icons';


const Investments = () => {
  const [investsbalance, setInvestsbalance] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const investsRef = collection(db, 'users', currentUser.uid, 'investments');
  // STATE TO HOLD INVESTMENTS VALUES
  const [currentMonthinvstotal, setCurrentMonthtotal] = useState(null);
  const [lastMonthinvstotal, setLastMonthtotal] = useState(null);


  useEffect(()=>{
    const getInvestData = async () => {
      const today = new Date();
      const currentMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const investsdata = await getDocs(investsRef);

      // BILLS QUERY
      const currentMonthQuery = query(
        investsRef,
        where('timeStamp', '<=', today),
        where('timeStamp', '>', currentMonth)
      );

      const lastMonthQuery = query(
        investsRef,
        where('timeStamp', '<=', currentMonth),
        where('timeStamp', '>', lastMonth)
      );

      const currentMonthData = await getDocs(currentMonthQuery);
      const lastMonthData = await getDocs(lastMonthQuery);

       // INVEST CURRENT MONTH
       let currentMonthinv = currentMonthData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
       let currentMonthinvstotal = 0;
       for (let balance of currentMonthinv) {
         currentMonthinvstotal += parseInt(balance.amount);
       }
       setCurrentMonthtotal(currentMonthinvstotal)
       // INVEST LAST MONTH
       let lastMonthinv = lastMonthData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
       let lastMonthinvstotal = 0;
       for (let balance of lastMonthinv) {
         lastMonthinvstotal += parseInt(balance.amount);
       }
       setLastMonthtotal(lastMonthinvstotal)

      //  OVERALL INVESTMENT
      let investments = investsdata.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let investstotal = 0;
      for (let balance of investments) {
        investstotal += parseInt(balance.amount);
      }
      setInvestsbalance(investstotal);
    }
    getInvestData()
  },[])

  const value = currentMonthinvstotal;
  const percentage = (value * 100)/investsbalance;

  return (
    <div className="investments">
      <div className="top">
        <Heading as="h3" size="sm" className="head">
          Total Investments
        </Heading>
        <MoreVertSharp fontSize='sm' />
      </div>

      <div className="bottom">
        <div className="investChart">
          <CircularProgressbar
            value={value} maxValue={investsbalance} text={`${percentage}%`}
            styles={buildStyles({
              strokeLinecap: 'round',
              textSize: '16px',
              pathTransitionDuration: 0.8,
              pathColor: `#00C49Fef`,
              textColor: 'green',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
        <p className="desc">Percentage of this month's investment against total Investments.</p>
        <span className="title">Total investments</span>
        <p className="amount">${investsbalance}</p>

        <div className="summary">
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult lastmonth">
              <CalendarIcon fontSize="sm" style={{marginRight: '5px'}}/>
              <div className="resultAmount">${lastMonthinvstotal}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Month</div>
            <div className="itemResult thismonth">
            <CalendarIcon fontSize="sm" style={{marginRight: '5px'}}/>
              <div className="resultAmount">${currentMonthinvstotal}</div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Investments;
