import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import '../pchart/pchart.scss';
import '../../pages/profile/profile.scss'
import { Circle, Heading } from '@chakra-ui/layout';
import { AddCircleOutlineRounded } from '@material-ui/icons';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

 const COLORS = ['#0088FEdf', '#00C49Fdf', '#FFBB28df', '#FF8042df'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Pchart = () => {

    return (
      <div className="chart">
      <div className="charthead">
            <Heading size="sm">Budget</Heading>
            <Heading size="sm" className='month'>
              <AddCircleOutlineRounded style={{fontSize:"14px", marginRight:"5px"}}/>
              Current Month</Heading>
          </div>
       <ResponsiveContainer width="100%" height="90%">
        
         <PieChart width={400} height={400}>
           <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>
    );
  
}

export default Pchart;
