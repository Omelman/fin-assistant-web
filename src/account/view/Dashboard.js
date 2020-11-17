import React from 'react';
import NavbarMenu from '../components/NavbarMenu';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import './Dashboard.css'

const Dia = () => {
  const data = [
    { name: 'Food & Drinks', users: 2000 },
    { name: 'Transportation', users: 1500000000 },
    { name: 'Housing', users: 1000000000 },
    { name: 'Vehicle', users: 500000000 },
    { name: 'Life & Entertainment', users: 1000000000 },
    { name: "Communication & PC", users: 500000000 },
    { name: "Shopping", users: 500000000 },
    { name: 'Financial expenses ', users: 500000000 },
    { name: 'Investment', users: 500000000 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Charts</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};


const Dashboard = () => { 
 
  return (
    <>
   <NavbarMenu/>
   <div className='dia'>
   <Dia/>
   </div>
   
   
   
    </>
  )
}

export default Dashboard;
