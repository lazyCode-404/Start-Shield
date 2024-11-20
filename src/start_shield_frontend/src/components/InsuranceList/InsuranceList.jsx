import React, { useEffect, useState } from 'react';
import { getAllInsurances } from '../../api/insuranceService';

const InsuranceList = () => {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const data = await getAllInsurances();
        setInsurances(Array.isArray(data) ? data : []); // Asigură-te că este un array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch insurances:', error);
        setLoading(false);
      }
    };

    fetchInsurances();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Insurance List</h1>
      <ul>
        {insurances.map((insurance) => (
          <li key={insurance.id}>{insurance.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsuranceList;
