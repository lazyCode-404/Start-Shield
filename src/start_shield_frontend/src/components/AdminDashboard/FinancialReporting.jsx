import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';

function FinancialReporting() {
  const [financialData, setFinancialData] = useState({
    revenue: [],
    expenses: [],
    totalRevenue: 0,
    totalExpenses: 0
  });

  useEffect(() => {
    fetch('/api/financialData')
      .then(res => res.json())
      .then(data => setFinancialData(data))
      .catch(error => console.error('Error fetching financial data:', error));
  }, []);

  const revenueData = {
    labels: financialData.revenue.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: financialData.revenue.map(item => item.amount),
        borderColor: 'green',
        fill: false
      }
    ]
  };

  return (
    <div>
      <h3>Financial Reporting</h3>
      <Line data={revenueData} />
    </div>
  );
}

export default FinancialReporting;

