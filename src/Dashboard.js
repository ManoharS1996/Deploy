import React from 'react';
// import {Pie, Bar} from 'react';
//import {Line} from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';



const Dashboard = () => {
  const pieData = {
    labels: ['Electronics', 'Clothing', 'Home'],
    datasets: [{
      data: [300, 200, 100],
      backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'],
    }],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Sales',
      data: [100, 200, 300],
      backgroundColor: '#ffcc99',
    }],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Revenue',
      data: [500, 700, 800],
      borderColor: '#ff6347',
      fill: false,
    }],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Pie Chart</h3>
        {/* <Pie data={pieData} /> */}
      </div>
      <div>
        <h3>Bar Graph</h3>
        {/* <Bar data={barData} /> */}
      </div>
      <div>
        <h3>Line Graph</h3>
        <line data={lineData} />
      </div>
    </div>
  );
};

export default Dashboard;
