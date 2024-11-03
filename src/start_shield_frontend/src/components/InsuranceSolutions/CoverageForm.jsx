// import React, { useState } from 'react';
// import data from '../../../data.json';

// const CoverageForm = () => {
//   const [formData, setFormData] = useState({
//     industry: '',
//     revenue: '',
//     employees: '',
//     customCoverage: false
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save form data to JSON or backend (you can implement the save logic)
//     alert('Quote generated!');
//   };

//   return (
//     <div className="coverage-form">
//       <h2>Get a Quote</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Industry Type</label>
//         <input
//           type="text"
//           name="industry"
//           value={formData.industry}
//           onChange={handleChange}
//         />
        
//         <label>Annual Revenue</label>
//         <input
//           type="number"
//           name="revenue"
//           value={formData.revenue}
//           onChange={handleChange}
//         />

//         <label>Number of Employees</label>
//         <input
//           type="number"
//           name="employees"
//           value={formData.employees}
//           onChange={handleChange}
//         />

//         <label>Custom Coverage?</label>
//         <input
//           type="checkbox"
//           name="customCoverage"
//           checked={formData.customCoverage}
//           onChange={handleChange}
//         />

//         <button type="submit">Get a Quote</button>
//       </form>
//     </div>
//   );
// };

// export default CoverageForm;
