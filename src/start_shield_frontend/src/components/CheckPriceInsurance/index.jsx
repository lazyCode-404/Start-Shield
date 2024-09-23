import React, { useState } from 'react';
import data from '../../../data.json';
import './style.css';

function CheckPriceInsurance() {
  const [smallCompanyType, setSmallCompanyType] = useState('');
  const [mediumCompanyType, setMediumCompanyType] = useState('');
  const [smallCompanyInfo, setSmallCompanyInfo] = useState(null);
  const [mediumCompanyInfo, setMediumCompanyInfo] = useState(null);
  const [smallCompanyValue, setSmallCompanyValue] = useState('');
  const [mediumCompanyValue, setMediumCompanyValue] = useState('');
  const [smallInsuranceRate, setSmallInsuranceRate] = useState('');
  const [mediumInsuranceRate, setMediumInsuranceRate] = useState('');
  const [name, setName] = useState('');
  const [savedPolicies, setSavedPolicies] = useState([]);

  const handleSmallCompanyChange = (event) => {
    const selected = event.target.value;
    setSmallCompanyType(selected);
    setSmallCompanyInfo(data.smallCompanies[selected]);
  };

  const handleMediumCompanyChange = (event) => {
    const selected = event.target.value;
    setMediumCompanyType(selected);
    setMediumCompanyInfo(data.mediumCompanies[selected]);
  };

  const calculateInsurance = (value, rate, paymentType) => {
    let insurance = (value * rate) / 100;
    if (paymentType === 'monthly') {
      insurance += (insurance * 5) / 100; // Additional monthly fee
    } else {
      insurance -= (insurance * 10) / 100; // Discount for annual payment
    }
    return insurance;
  };

  const savePolicy = async (companyType, value, rate, paymentType) => {
    const response = await fetch('/api/savePolicy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, companyType, value, rate, paymentType }),
    });
    const data = await response.text();
    alert(data);
  };

  const loadSavedPolicies = async () => {
    const response = await fetch(`/api/getPolicies/${name}`);
    const data = await response.json();
    setSavedPolicies(data || []);
  };

  return (
    <div className="App">
      <h1>Company Insurance Calculator</h1>

      {/* Input for Name */}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        onClick={loadSavedPolicies}
      >
        Load Saved Policies
      </button>

      {/* Small Company Section */}
      <div>
        <h2>Small Companies</h2>
        <select value={smallCompanyType} onChange={handleSmallCompanyChange}>
          <option value="">Select Company Type</option>
          {Object.keys(data.smallCompanies).map((company) => (
            <option key={company} value={company}>
              {company.charAt(0).toUpperCase() + company.slice(1)}
            </option>
          ))}
        </select>
        {smallCompanyInfo && (
          <div>
            <p>{smallCompanyInfo.description}</p>
            <form>
              <input
                type="number"
                placeholder="Enter Value"
                value={smallCompanyValue}
                onChange={(e) => setSmallCompanyValue(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter (%)"
                value={smallInsuranceRate}
                onChange={(e) => setSmallInsuranceRate(e.target.value)}
              />
              <select
                onChange={(e) => setSmallInsuranceRate(e.target.value)}
                value={smallInsuranceRate}
              >
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
              </select>
              <p>Insurance: {calculateInsurance(smallCompanyValue, smallInsuranceRate, 'annual')}</p>
              <button
                type="button"
                onClick={() => savePolicy(smallCompanyType, smallCompanyValue, smallInsuranceRate, 'annual')}
              >
                Save Policy
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Medium Company Section */}
      <div>
        <h2>Medium Companies</h2>
        <select value={mediumCompanyType} onChange={handleMediumCompanyChange}>
          <option value="">Select Company Type</option>
          {Object.keys(data.mediumCompanies).map((company) => (
            <option key={company} value={company}>
              {company.charAt(0).toUpperCase() + company.slice(1)}
            </option>
          ))}
        </select>
        {mediumCompanyInfo && (
          <div>
            <p>{mediumCompanyInfo.description}</p>
            <form>
              <input
                type="number"
                placeholder="Enter Value"
                value={mediumCompanyValue}
                onChange={(e) => setMediumCompanyValue(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter (%)"
                value={mediumInsuranceRate}
                onChange={(e) => setMediumInsuranceRate(e.target.value)}
              />
              <select
                onChange={(e) => setMediumInsuranceRate(e.target.value)}
                value={mediumInsuranceRate}
              >
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
              </select>
              <p>Insurance: {calculateInsurance(mediumCompanyValue, mediumInsuranceRate, 'annual')}</p>
              <button
                type="button"
                onClick={() => savePolicy(mediumCompanyType, mediumCompanyValue, mediumInsuranceRate, 'annual')}
              >
                Save Policy
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Display Saved Policies */}
      <div className="saved-policies">
        <h2>Saved Policies</h2>
        <div className="policy-columns">
          {savedPolicies.map((policy, index) => (
            <div key={index} className="policy-column">
              <h3>Policy {index + 1}</h3>
              <p>Company Type: {policy[0]}</p>
              <p>Value: {policy[1]}</p>
              <p>Rate: {policy[2]}</p>
              <p>Payment Type: {policy[3]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckPriceInsurance;




// import React, { useState } from 'react';
// import data from '../../../data.json';
// import './style.css';

// function CheckPriceInsurance() {
//   const [smallCompanyType, setSmallCompanyType] = useState('');
//   const [mediumCompanyType, setMediumCompanyType] = useState('');
//   const [smallCompanyInfo, setSmallCompanyInfo] = useState(null);
//   const [mediumCompanyInfo, setMediumCompanyInfo] = useState(null);
//   const [smallCompanyValue, setSmallCompanyValue] = useState('');
//   const [mediumCompanyValue, setMediumCompanyValue] = useState('');
//   const [smallInsuranceRate, setSmallInsuranceRate] = useState('');
//   const [mediumInsuranceRate, setMediumInsuranceRate] = useState('');
//   const [paymentType, setPaymentType] = useState('annually');
//   const [savedPolicies, setSavedPolicies] = useState([]);
//   const [name, setName] = useState('');

//   const handleSmallCompanyChange = (event) => {
//     const selected = event.target.value;
//     setSmallCompanyType(selected);
//     setSmallCompanyInfo(data.smallCompanies[selected]);
//   };

//   const handleMediumCompanyChange = (event) => {
//     const selected = event.target.value;
//     setMediumCompanyType(selected);
//     setMediumCompanyInfo(data.mediumCompanies[selected]);
//   };

//   const calculateInsurance = (value, rate, paymentType) => {
//     let insurance = (value * rate) / 100;
//     if (paymentType === 'monthly') {
//       // Apply 5% interest for monthly payment
//       insurance += (insurance * 5) / 100;
//     } else {
//       // Apply 10% discount for annual payment
//       insurance -= (insurance * 10) / 100;
//     }
//     return insurance;
//   };

//   const savePolicy = (companyType, companyValue, insuranceRate, paymentType) => {
//     if (savedPolicies.length < 3) {
//       const policy = {
//         companyType,
//         companyValue,
//         insuranceRate,
//         paymentType,
//       };
//       setSavedPolicies([...savedPolicies, policy]);
//     } else {
//       alert('You can only save up to 3 policies.');
//     }
//   };

//   const saveToFile = async () => {
//     const policiesToSave = {
//       name,
//       savedPolicies,
//     };
//     await fetch('http://localhost:8000/api/savePolicies', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(policiesToSave),
//     });
//   };

//   return (
//     <div className="App">
//       <h1>Company Insurance Calculator</h1>

//       {/* User Name */}
//       <form>
//         <input
//           type="text"
//           placeholder="Enter Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </form>

//       {/* Small Company Section */}
//       <div>
//         <h2>Small Companies</h2>
//         <select value={smallCompanyType} onChange={handleSmallCompanyChange}>
//           <option value="">Select Company Type</option>
//           {Object.keys(data.smallCompanies).map((company) => (
//             <option key={company} value={company}>
//               {company.charAt(0).toUpperCase() + company.slice(1)}
//             </option>
//           ))}
//         </select>
//         {smallCompanyInfo && (
//           <div>
//             <p>{smallCompanyInfo.description}</p>
//             <form>
//               <input
//                 type="number"
//                 placeholder="Enter Value"
//                 value={smallCompanyValue}
//                 onChange={(e) => setSmallCompanyValue(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Enter (%)"
//                 value={smallInsuranceRate}
//                 onChange={(e) => setSmallInsuranceRate(e.target.value)}
//               />
//               <select onChange={(e) => setPaymentType(e.target.value)}>
//                 <option value="annually">Annually</option>
//                 <option value="monthly">Monthly</option>
//               </select>
//               <p>
//                 Insurance:{' '}
//                 {calculateInsurance(smallCompanyValue, smallInsuranceRate, paymentType)}
//               </p>
//             </form>
//             <button
//               onClick={() =>
//                 savePolicy(smallCompanyType, smallCompanyValue, smallInsuranceRate, paymentType)
//               }
//             >
//               Save Policy
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Medium Company Section */}
//       <div>
//         <h2>Medium Companies</h2>
//         <select value={mediumCompanyType} onChange={handleMediumCompanyChange}>
//           <option value="">Select Company Type</option>
//           {Object.keys(data.mediumCompanies).map((company) => (
//             <option key={company} value={company}>
//               {company.charAt(0).toUpperCase() + company.slice(1)}
//             </option>
//           ))}
//         </select>
//         {mediumCompanyInfo && (
//           <div>
//             <p>{mediumCompanyInfo.description}</p>
//             <form>
//               <input
//                 type="number"
//                 placeholder="Enter Value"
//                 value={mediumCompanyValue}
//                 onChange={(e) => setMediumCompanyValue(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Enter (%)"
//                 value={mediumInsuranceRate}
//                 onChange={(e) => setMediumInsuranceRate(e.target.value)}
//               />
//               <select onChange={(e) => setPaymentType(e.target.value)}>
//                 <option value="annually">Annually</option>
//                 <option value="monthly">Monthly</option>
//               </select>
//               <p>
//                 Insurance:{' '}
//                 {calculateInsurance(mediumCompanyValue, mediumInsuranceRate, paymentType)}
//               </p>
//             </form>
//             <button
//               onClick={() =>
//                 savePolicy(mediumCompanyType, mediumCompanyValue, mediumInsuranceRate, paymentType)
//               }
//             >
//               Save Policy
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Saved Policies Section */}
//       <div>
//         <h2>Saved Policies for Comparison</h2>
//         <div className="saved-policies">
//           {savedPolicies.map((policy, index) => (
//             <div key={index} className="policy-card">
//               <p>Company Type: {policy.companyType}</p>
//               <p>Value: {policy.companyValue}</p>
//               <p>Rate: {policy.insuranceRate}%</p>
//               <p>Payment: {policy.paymentType}</p>
//             </div>
//           ))}
//         </div>
//         <button onClick={saveToFile}>Save Data</button>
//       </div>
//     </div>
//   );
// }

// export default CheckPriceInsurance;





// import data from '../../../data.json';
// import './style.css'


// function CheckPriceInsurance() {
//   const [smallCompanyType, setSmallCompanyType] = useState('');
//   const [mediumCompanyType, setMediumCompanyType] = useState('');
//   const [smallCompanyInfo, setSmallCompanyInfo] = useState(null);
//   const [mediumCompanyInfo, setMediumCompanyInfo] = useState(null);
//   const [smallCompanyValue, setSmallCompanyValue] = useState('');
//   const [mediumCompanyValue, setMediumCompanyValue] = useState('');
//   const [smallInsuranceRate, setSmallInsuranceRate] = useState('');
//   const [mediumInsuranceRate, setMediumInsuranceRate] = useState('');

//   const handleSmallCompanyChange = (event) => {
//     const selected = event.target.value;
//     setSmallCompanyType(selected);
//     setSmallCompanyInfo(data.smallCompanies[selected]);
//   };

//   const handleMediumCompanyChange = (event) => {
//     const selected = event.target.value;
//     setMediumCompanyType(selected);
//     setMediumCompanyInfo(data.mediumCompanies[selected]);
//   };

//   const calculateInsurance = (value, rate) => {
//     return (value * rate) / 100;
//   };
// // const getInsuranceRate = async (companyType, companySize) => {
// //     const response = await fetch(`http://localhost:8000/api/insurance/${companySize}/${companyType}`);
// //     const data = await response.json();
// //     return data;
// //   };
  
// //   const calculateInsurance = async (value, rate) => {
// //     const response = await fetch(`http://localhost:8000/api/calculate`, {
// //       method: 'POST',
// //       body: JSON.stringify({ value, rate }),
// //     });
// //     const data = await response.json();
// //     return data;
// //   };

//   return (
//     <div className="App">
//       <h1>Company Insurance Calculator</h1>

//       {/* Small Company Section */}
//       <div>
//         <h2>Small Companies</h2>
//         <select value={smallCompanyType} onChange={handleSmallCompanyChange}>
//           <option value="">Select Company Type</option>
//           {Object.keys(data.smallCompanies).map((company) => (
//             <option key={company} value={company}>
//               {company.charAt(0).toUpperCase() + company.slice(1)}
//             </option>
//           ))}
//         </select>
//         {smallCompanyInfo && (
//           <div>
//             <p>{smallCompanyInfo.description}</p>
//             <form>
//               <input
//                 type="number"
//                 placeholder="Enter Value"
//                 value={smallCompanyValue}
//                 onChange={(e) => setSmallCompanyValue(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Enter (%)"
//                 value={smallInsuranceRate}
//                 onChange={(e) => setSmallInsuranceRate(e.target.value)}
//               />
//               <p>Insurance: {calculateInsurance(smallCompanyValue, smallInsuranceRate)}</p>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Medium Company Section */}
//       <div>
//         <h2>Medium Companies</h2>
//         <select value={mediumCompanyType} onChange={handleMediumCompanyChange}>
//           <option value="">Select Company Type</option>
//           {Object.keys(data.mediumCompanies).map((company) => (
//             <option key={company} value={company}>
//               {company.charAt(0).toUpperCase() + company.slice(1)}
//             </option>
//           ))}
//         </select>
//         {mediumCompanyInfo && (
//           <div>
//             <p>{mediumCompanyInfo.description}</p>
//             <form>
//               <input
//                 type="number"
//                 placeholder="Enter Value"
//                 value={mediumCompanyValue}
//                 onChange={(e) => setMediumCompanyValue(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Enter (%)"
//                 value={mediumInsuranceRate}
//                 onChange={(e) => setMediumInsuranceRate(e.target.value)}
//               />
//               <p>Insurance: {calculateInsurance(mediumCompanyValue, mediumInsuranceRate)}</p>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CheckPriceInsurance;



