import './rchart.scss';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {  Heading } from '@chakra-ui/layout';
import { AddCircleOutlineRounded } from '@material-ui/icons';
const mydata = [
  {
    name: 'Week 1',
    sav: 4000,
    inv: 2400,
    inc: 3000,
    bill: 2100,
    
  },
  {
    name: 'Week 2',
    sav: 3000,
    inv: 1398,
    inc: 1000,
    bill: 2800,
    
  },
  {
    name: 'Week 3',
    sav: 2000,
    inv: 9800,
    inc: 4000,
    bill: 2900,
    
  },
  {
    name: 'Week 4',
    sav: 2780,
    inv: 3908,
    inc: 1200,
    bill: 2300,
    
  },
];

const Rchart = ({aspect, title}) => {
  return (
    <div className="rechart">
      <div className="recharthead">
            <Heading size="sm">{title}</Heading>
            <Heading size="sm" className='month'>
              <AddCircleOutlineRounded style={{fontSize:"14px", marginRight:"5px"}}/>
              Current Month</Heading>
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
      <Bar dataKey="inc" fill="#0088FEcf" />
      <Bar dataKey="inv" fill="#00C49Fcf" />
      <Bar dataKey="sav" fill="#FFBB28cf" />
      <Bar dataKey="bill" fill="#FF8042cf" />
      {/* #0088FE */}
      {/* 2E52B0 */}
      {/* 00C49F  green*/}
      {/* F44949 */}
      {/* FAA3A3 */}
    </BarChart>
  
   </div>
  );
};

export default Rchart;
