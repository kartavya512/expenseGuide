import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyExpenseChart = ({ expenseData }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust for mobile width
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen to screen resize
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={expenseData}
          margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 60 : 20 }} // Add space for rotated labels on mobile
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Month', position: 'insideBottomRight', offset: 0 }}
          />
          <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;
