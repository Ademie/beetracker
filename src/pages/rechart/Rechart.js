import './rechart.scss';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {  Heading } from '@chakra-ui/layout';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { useEffect } from 'react';
const mydata = [
  {
    name: 'Week 1',
    sav: 4000,
    inv: 2400,
    
  },
  {
    name: 'Week 2',
    sav: 3000,
    inv: 1398,
    
  },
  {
    name: 'Week 3',
    sav: 2000,
    inv: 9800,
    
  },
  {
    name: 'Week 4',
    sav: 2780,
    inv: 3908,
    
  },
];



const Rechart = ({aspect, title}) => {
  const getLocal = () => {
    const our = localStorage.getItem('month')
    console.log(our)
  }
  getLocal();
  return (
    <div className="rechart">
      <div className="recharthead">
            <Heading size="sm">{title}</Heading>
            <Heading size="sm" className='month'>
              <AddCircleOutlineRounded style={{fontSize:"14px", marginRight:"5px"}}/>
              6 Months</Heading>
          </div>
    
    <BarChart
      width={600}
      height={300}
      data={mydata}
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
      <Bar dataKey="inv" fill="#8884d8" />
      <Bar dataKey="sav" fill="#82ca9d" />
    </BarChart>
  
   </div>
  );
};

export default Rechart;
