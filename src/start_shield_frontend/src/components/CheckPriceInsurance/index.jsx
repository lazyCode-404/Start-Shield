// import React, { useState, useEffect } from "react";
// import { Container, Button, Row } from "react-bootstrap";
// import "./style.css";
// import axios from "axios";
// import { addCompany } from "../../api";
// import { useAuth } from "../../context/AppContext";
// import { uploadToIPFS } from "../../utils/ipfs"; // Ensure you have IPFS utils

// const InsuranceForm = () => {
//   const [hasAccount, setHasAccount] = useState(null);
//   const [companySize, setCompanySize] = useState(null);
//   const [owners, setOwners] = useState([{ firstName: "", lastName: "" }]);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [uploadedDocuments, setUploadedDocuments] = useState([]);
//   const { backendActor, login, logout, isAuthenticated } = useAuth(); // Auth context
//   const [formData, setFormData] = useState({
//     companyName: "",
//     registrationNumber: "",
//     email: "",
//     phone: "",
//     address: {
//       country: "",
//       state: "",
//       city: "",
//       street: "",
//       number: "",
//       postalCode: "",
//     },
//     insuranceType: "",
//     additionalInfo: "",
//     insuredValue: "",
//     policyValue: "",
//     paymentOption: "annual",
//     premium: false,
//     startDate: "",
//     endDate: "",
//     insuranceMonths: 12,
//     termsAgreed: false,
//     over18: false,
//     discount: 0,
//     commission: 0,
//     tokensEarned: 0,
//     rewardPercentage: 5,
//     industryType: "",
//     annualRevenue: "",
//     employees: "",
//   });

//   const annualDiscount = 10;
//   const monthlyCommission = 5;

//   const calculateEndDate = () => {
//     if (formData.startDate && formData.insuranceMonths) {
//       const start = new Date(formData.startDate);
//       start.setMonth(start.getMonth() + parseInt(formData.insuranceMonths));
//       const endDate = start.toISOString().split("T")[0];
//       setFormData((prev) => ({
//         ...prev,
//         endDate: endDate,
//       }));
//     }
//   };

//   useEffect(() => {
//     calculateEndDate();
//   }, [formData.startDate, formData.insuranceMonths]);

//   useEffect(() => {
//     if (formData.registrationNumber) {
//       axios
//         .get(`http://localhost:4943/api/company/${formData.registrationNumber}`)
//         .then((response) => {
//           if (response.data) {
//             setFormData((prev) => ({
//               ...prev,
//               ...response.data,
//             }));
//             setOwners(response.data.owners || [{ firstName: "", lastName: "" }]);
//           }
//         })
//         .catch((error) => console.error(error));
//     }
//   }, [formData.registrationNumber]);

//   const calculatePayment = () => {
//     let payment = parseFloat(formData.policyValue) || 0;
//     if (formData.paymentOption === "annual") {
//       payment -= (annualDiscount / 100) * payment;
//       formData.tokensEarned =
//         (formData.rewardPercentage / 100) * formData.insuredValue;
//     } else {
//       payment += (monthlyCommission / 100) * payment;
//       formData.tokensEarned = 0;
//     }
//     return payment.toFixed(2);
//   };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!isAuthenticated) {
//   //     alert("You must log in to submit the form.");
//   //     login(); // Redirecționează utilizatorul către autentificare
//   //     return;
//   //   }

//   //   if (!backendActor || !backendActor.identity) {
//   //     console.error("Backend actor or identity is not initialized.");
//   //     alert("An error occurred. Please try again later.");
//   //     return;
//   //   }

//   //   if (!formData.termsAgreed || !formData.over18) {
//   //     alert("You must agree to the terms and confirm you are over 18.");
//   //     return;
//   //   }

//   //   try {
//   //     // Uploading data to RESTful API
//   //     await axios.post("http://localhost:4943/api/apply", {
//   //       ...formData,
//   //       owners,
//   //       uploadedImages,
//   //       uploadedDocuments,
//   //     });

//   //     alert("Data successfully sent to the RESTful API!");

//   //     // Adding the company to the Motoko backend
//   //     const principal = backendActor.identity.getPrincipal(); // Accesăm principalul utilizatorului
//   //     const company = {
//   //       ...formData,
//   //       insuredValue: BigInt(formData.insuredValue || "0"),
//   //       policyValue: BigInt(formData.policyValue || "0"),
//   //       insuranceMonths: BigInt(formData.insuranceMonths || "0"),
//   //       discount: BigInt(annualDiscount),
//   //       commission: BigInt(monthlyCommission),
//   //       tokensEarned: BigInt(formData.tokensEarned || "0"),
//   //       annualRevenue: BigInt(formData.annualRevenue || "0"),
//   //       employees: BigInt(formData.employees || "0"),
//   //     };

//   //     const result = await backendActor.addCompany(principal, company);

//   //     if (result) {
//   //       alert("Company successfully added to the backend canister!");
//   //     } else {
//   //       alert("Failed to add company data to the backend.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting data:", error);
//   //     alert("An error occurred during submission.");
//   //   }
//   // };
//   // useEffect(() => {
//   //   const initializeOnMount = async () => {
//   //     const authClient = await AuthClient.create();
//   //     await initializeAuth(authClient);
//   //   };

//   //   initializeOnMount();
//   // }, []);

//   // if (!isAuthenticated) {
//   //   console.error("User is not authenticated.");
//   //   alert("Please log in to continue.");
//   //   login(); // Redirecționează utilizatorul către procesul de autentificare
//   //   return;
//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.termsAgreed || !formData.over18) {
//       alert("You must agree to the terms and confirm you are over 18.");
//       return;
//     }

//     try {
//       // Uploading data to RESTful API
//       await axios.post("http://localhost:4943/api/apply", {
//         ...formData,
//         owners,
//         uploadedImages,
//         uploadedDocuments,
//       });

//       alert("Data successfully sent to the RESTful API!");

//       // Adding the company to the Motoko backend
//       const principal = await backendActor.identity.getPrincipal();
//       const company = {
//         ...formData,
//         insuredValue: BigInt(formData.insuredValue),
//         policyValue: BigInt(formData.policyValue),
//         insuranceMonths: BigInt(formData.insuranceMonths),
//         discount: BigInt(annualDiscount),
//         commission: BigInt(monthlyCommission),
//         tokensEarned: BigInt(formData.tokensEarned),
//         annualRevenue: BigInt(formData.annualRevenue),
//         employees: BigInt(formData.employees),
//       };

//       const result = await backendActor.addCompany(principal, company);

//       if (result) {
//         alert("Company successfully added to the backend canister!");
//       } else {
//         alert("Failed to add company data to the backend.");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("An error occurred during submission.");
//     }
//   };


//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleOwnerChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedOwners = [...owners];
//     updatedOwners[index][name] = value;
//     setOwners(updatedOwners);
//   };

//   const addOwner = () => {
//     setOwners([...owners, { firstName: "", lastName: "" }]);
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       address: {
//         ...prev.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedImageLinks = [];

//     for (const file of files) {
//       const ipfsUrl = await uploadToIPFS(file);
//       if (ipfsUrl) {
//         uploadedImageLinks.push(ipfsUrl);
//       }
//     }

//     setUploadedImages(uploadedImageLinks);
//   };

//   const handleDocumentUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedDocumentLinks = [];

//     for (const file of files) {
//       const ipfsUrl = await uploadToIPFS(file);
//       if (ipfsUrl) {
//         uploadedDocumentLinks.push(ipfsUrl);
//       }
//     }

//     setUploadedDocuments(uploadedDocumentLinks);
//   };
//   const handleLoginPrompt = () => {
//     if (!isAuthenticated) {
//       alert("Please log in to access this section.");
//       login(); // Initiates login process
//     } else {
//       setHasAccount(true); // Proceed if logged in
//     }
//   };
//   const handleLogoutClick = () => {
//     logout();
//     setHasAccount(null); // Reset to initial state
//     setCompanySize(null); // Clear selected company size
//     setFormData({
//       companyName: "",
//       registrationNumber: "",
//       email: "",
//       phone: "",
//       address: {
//         country: "",
//         state: "",
//         city: "",
//         street: "",
//         number: "",
//         postalCode: "",
//       },
//       insuranceType: "",
//       additionalInfo: "",
//       insuredValue: "",
//       policyValue: "",
//       paymentOption: "annual",
//       premium: false,
//       startDate: "",
//       endDate: "",
//       insuranceMonths: 12,
//       termsAgreed: false,
//       over18: false,
//       discount: 0,
//       commission: 0,
//       tokensEarned: 0,
//       rewardPercentage: 5,
//       industryType: "",
//       annualRevenue: "",
//       employees: "",
//     });
//   };
//   // if (!cn || !cn.identity) {
//   //   console.error("Identity is undefined", cn);
//   //   return; // Prevent further execution if identity is missing
//   // }

//   // // Continue with submission logic
//   // submitData(cn.identity);


//   return (
//     <div>
//   <Container>
//       {hasAccount === null ? (
//         <div>
//           <h2>Do you have an account?</h2>
//           {!isAuthenticated ? (
//             <>
//               <Button className="btn btn-primary" onClick={handleLoginPrompt}>
//                 Login to Continue
//               </Button>
//               <Button
//                 className="btn btn-secondary"
//                 onClick={() => setHasAccount(false)}
//               >
//                 Continue as Guest
//               </Button>
//             </>
//           ) : (
//             <>
//             <Button className="btn btn-danger" onClick={handleLogoutClick}>
//               Logout
//             </Button>
//              <Button
//              className="btn btn-secondary"
//              onClick={() => setHasAccount(true)}
//            >
//              Welcome and pressme for next step!
//            </Button>
//            </>
//           )}
//         </div>
//       ) : (

//           <>
//             <Container style={{ margin: '20px' }}>
//               <h2>Select Company Size</h2>
//               <div style={{ marginBottom: "5px" }}>
//                 <label className="radio-button">
//                   <input
//                     type="radio"
//                     name="companySize"
//                     value="micro"
//                     checked={companySize === "micro"}
//                     onChange={() => setCompanySize("micro")}
//                   />
//                   Micro Company
//                 </label>{" "}
//                 <label className="radio-button">
//                   <input
//                     type="radio"
//                     name="companySize"
//                     value="small"
//                     checked={companySize === "small"}
//                     onChange={() => setCompanySize("small")}
//                   />
//                   Small Company
//                 </label>
//                 <label className="radio-button">
//                   <input
//                     type="radio"
//                     name="companySize"
//                     value="large"
//                     checked={companySize === "large"}
//                     onChange={() => setCompanySize("large")}
//                   />
//                   Large Company
//                 </label>
//               </div>
//             </Container>

//                  {companySize && (
//                   <>
//                     <Container className="input-fild">
//                       <h3>Company Information</h3>
//                       {/* <span className="info-icon">i
//                         <span className="info-text">Here’s some more information!</span>
//                       </span> */}
//                       <input
//                         type="text"
//                         name="companyName"
//                         placeholder="Company Name"
//                         value={formData.companyName}
//                         onChange={handleInputChange}
//                       />

//                       <input
//                         type="text"
//                         name="registrationNumber"
//                         placeholder="Registration Number"
//                         value={formData.registrationNumber}
//                         onChange={handleInputChange}
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                       />
//                       <input
//                         type="tel"
//                         name="phone"
//                         placeholder="Phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                       />
//                       <input
//                         type="text"
//                         name="industryType"
//                         placeholder="Industry Type"
//                         value={formData.industryType}
//                         onChange={handleInputChange}
//                       />
//                       <input
//                         type="number"
//                         name="annualRevenue"
//                         placeholder="Annual Revenue"
//                         value={formData.annualRevenue}
//                         onChange={handleInputChange}
//                       />
//                       <input
//                         type="number"
//                         name="employees"
//                         placeholder="Number of Employees"
//                         value={formData.employees}
//                         onChange={handleInputChange}
//                       />
//                     </Container>
//                     <Container className="input-fild">
//                       {/* Owner Information */}

//                       <h3>Owner Information</h3>
//                       <Container>
//                         {owners.map((owner, index) => (
//                           <div key={index} style={{ marginBottom: "5px" }}>
//                             <input
//                               type="text"
//                               name="firstName"
//                               placeholder="First Name"
//                               value={owner.firstName}
//                               onChange={(e) => handleOwnerChange(index, e)}
//                             />{" "}
//                             <input
//                               type="text"
//                               name="lastName"
//                               placeholder="Last Name"
//                               value={owner.lastName}
//                               onChange={(e) => handleOwnerChange(index, e)}
//                             />
//                           </div>
//                         ))}
//                       </Container>
//                     </Container>
//                     <Container >
//                       <Row>
//                         <Button onClick={addOwner}>Add More Owners/Partners</Button>
//                       </Row>
//                     </Container>

//                     {/* Company Address */}
//                     <Container className="input-fild">
//                       <h3>Company Address</h3>
//                       <input
//                         type="text"
//                         name="country"
//                         placeholder="Country"
//                         value={formData.address.country}
//                         onChange={handleAddressChange}
//                       />
//                       <input
//                         type="text"
//                         name="state"
//                         placeholder="State/Province"
//                         value={formData.address.state}
//                         onChange={handleAddressChange}
//                       />
//                       <input
//                         type="text"
//                         name="city"
//                         placeholder="City"
//                         value={formData.address.city}
//                         onChange={handleAddressChange}
//                       />
//                       <input
//                         type="text"
//                         name="street"
//                         placeholder="Street"
//                         value={formData.address.street}
//                         onChange={handleAddressChange}
//                       />
//                       <input
//                         type="text"
//                         name="number"
//                         placeholder="Street Number"
//                         value={formData.address.number}
//                         onChange={handleAddressChange}
//                       />
//                       <input
//                         type="text"
//                         name="postalCode"
//                         placeholder="Postal Code"
//                         value={formData.address.postalCode}
//                         onChange={handleAddressChange}
//                       />
//                     </Container>
//                     {/* Insurance Type */}
//                     <Container className='input-fild'>
//                       <h3>What Do You Want to Insure?</h3>
//                       <select
//                         name="insuranceType"
//                         value={formData.insuranceType}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Select a Type</option>
//                         <option value="static">Static Object</option>
//                         <option value="mobile">Mobile Object</option>
//                       </select>
//                     </Container>
//                     {/* Section for Static Objects (with images, GPS, sketches, documents) */}
//                     <Container className='input-fild'>
//                       {formData.insuranceType === "static" && (
//                         <div>
//                           <h4>Static Object Details</h4>
//                           <input
//                             type="text"
//                             name="gpsCoordinates"
//                             placeholder="GPS Coordinates"
//                             onChange={handleInputChange}
//                           />
//                           <input
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             onChange={handleImageUpload}
//                           />
//                           <input
//                             type="file"
//                             accept=".pdf,.doc,.docx"
//                             multiple
//                             onChange={handleDocumentUpload}
//                           />
//                           <textarea
//                             name="description"
//                             placeholder="Detailed Description"
//                             onChange={handleInputChange}
//                             style={{ width: '380px' }}
//                           />
//                         </div>
//                       )}
//                     </Container>
//                     {/* Section for Mobile Objects (with images, detailed description) */}
//                     <Container className='input-fild checkBoxes-fild'>
//                       {formData.insuranceType === "mobile" && (
//                         <div>
//                           <h4>Mobile Object Details</h4>
//                           <input
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             onChange={handleImageUpload}
//                           />
//                           <textarea
//                             name="description"
//                             placeholder="Detailed Description"
//                             onChange={handleInputChange}
//                             style={{ width: '380px' }}
//                           />
//                         </div>
//                       )}
//                     </Container>
//                     {/* Additional Information */}
//                     <Container className="input-fild checkBoxes-fild">
//                       <h3>Additional Info</h3>
//                       <textarea
//                         name="additionalInfo"
//                         placeholder="Any additional details about the insured asset..."
//                         value={formData.additionalInfo}
//                         onChange={handleInputChange}
//                         style={{ width: '380px' }}
//                       />
//                     </Container>
//                     {/* Insurance Details */}
//                     <Container className="input-fild checkBoxes-fild">
//                       <h3>Insurance Details</h3>
//                       <div style={{ marginBottom: '5px' }}>
//                         <input
//                           type="number"
//                           name="insuredValue"
//                           placeholder="Insured Value"
//                           value={formData.insuredValue}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div style={{ marginBottom: '5px' }}>
//                         <input
//                           type="number"
//                           name="policyValue"
//                           placeholder="Policy Value"
//                           value={formData.policyValue}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </Container>
//                     {/* Payment Options */}
//                     <Container className="input-fild checkBoxes-fild">
//                       <h3>Payment Options</h3>
//                       <label>
//                         <input
//                           type="radio"
//                           name="paymentOption"
//                           value="annual"
//                           checked={formData.paymentOption === "annual"}
//                           onChange={handleInputChange}
//                         />
//                         Annual Payment (10% discount)
//                       </label>
//                       <label>
//                         <input
//                           type="radio"
//                           name="paymentOption"
//                           value="monthly"
//                           checked={formData.paymentOption === "monthly"}
//                           onChange={handleInputChange}
//                         />
//                         Monthly Payment (5% commission)
//                       </label>
//                     </Container>
//                     <Container className="input-fild checkBoxes-fild">
//                       <h3>Premium Option</h3>
//                       <label>
//                         <input
//                           type="checkbox"
//                           name="premium"
//                           checked={formData.premium}
//                           onChange={handleInputChange}
//                           disabled={formData.paymentOption === "monthly"} // Dezactivat dacă plata este lunară
//                         />
//                         I want Premium Insurance (only available for annual payments)
//                       </label>
//                     </Container>

//                     {/* Terms and Conditions */}
//                     <Container className="input-fild checkBoxes-fild">
//                       <h3>Legal</h3>
//                       <label>
//                         <input
//                           type="checkbox"
//                           name="termsAgreed"
//                           checked={formData.termsAgreed}
//                           onChange={handleInputChange}
//                         />
//                         I agree to the terms and conditions.
//                       </label>
//                       <label>
//                         <input
//                           type="checkbox"
//                           name="over18"
//                           checked={formData.over18}
//                           onChange={handleInputChange}
//                         />
//                         I am over 18 years old.
//                       </label>
//                     </Container>
//                     {/* Start and End Dates Section */}
//                     <Container className="input-fild checkBoxes-fild">
//                       <h3>Insurance Period</h3>
//                       <div style={{ marginBottom: "5px" }}>
//                         <label>Start Date: </label>
//                         <input
//                           type="date"
//                           name="startDate"
//                           value={formData.startDate}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div style={{ marginBottom: "5px" }}>
//                         <label>Insurance Duration (Months): </label>
//                         <select
//                           name="insuranceMonths"
//                           value={formData.insuranceMonths}
//                           onChange={handleInputChange}
//                         >
//                           <option value={1}>1 Month</option>
//                           <option value={3}>3 Months</option>
//                           <option value={6}>6 Months</option>
//                           <option value={9}>9 Months</option>
//                           <option value={12}>12 Months</option>
//                           <option value={18}>18 Months</option>
//                           <option value={24}>24 Months</option>
//                         </select>
//                       </div>
//                       <div style={{ marginBottom: "5px" }}>
//                         <label>End Date: </label>
//                         <input
//                           type="text"
//                           name="endDate"
//                           value={formData.endDate}
//                           readOnly
//                         />
//                       </div>
//                     </Container>
//                     {/* Summary Preview */}
//                     <Button variant="success" onClick={handleSubmit}>
//                       Submit and Preview
//                     </Button>
//                     <Container className="input-fild checkBoxes-fild">
//                       <div className="summary-table">
//                         <h4>Summary of Your Choices</h4>
//                         <table>
//                           <tbody>
//                             <tr>
//                               <th>Field</th>
//                               <th>Value</th>
//                             </tr>
//                             <tr>
//                               <td>Company Name</td>
//                               <td>{formData.companyName}</td>
//                             </tr>
//                             <tr>
//                               <td>Registration Number</td>
//                               <td>{formData.registrationNumber}</td>
//                             </tr>
//                             <tr>
//                               <td>Insurance Type</td>
//                               <td>{formData.insuranceType}</td>
//                             </tr>
//                             <tr>
//                               <td>Policy Value</td>
//                               <td>{formData.policyValue}</td>
//                             </tr>
//                             <tr>
//                               <td>Payment Option</td>
//                               <td>{formData.paymentOption}</td>
//                             </tr>
//                             <tr>
//                               <td>Premium</td>
//                               <td>{formData.premium ? "Yes" : "No"}</td>
//                             </tr>
//                             <tr>
//                               <td>Discount</td>
//                               <td>{formData.paymentOption === "annual" ? `${annualDiscount}%` : "N/A"}</td>
//                             </tr>
//                             <tr>
//                               <td>Commission</td>
//                               <td>{formData.paymentOption === "monthly" ? `${monthlyCommission}%` : "N/A"}</td>
//                             </tr>
//                             <tr>
//                               <td>Tokens Earned</td>
//                               <td>{formData.tokensEarned}</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </Container>
//                   </>
//                 )}

//               </>
//             )}
//       </Container>
//     </div>
//   );

// };

// export default InsuranceForm;



import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import './style.css';
import axios from 'axios';
import { useAuth } from "../../context/AppContext";
import { uploadToIPFS } from "../../utils/ipfs";

const InsuranceForm = () => {
    const [hasAccount, setHasAccount] = useState(null);
    const [companySize, setCompanySize] = useState(null);
    const [owners, setOwners] = useState([{ firstName: "", lastName: "" }]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const { backendActor, login, logout, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        companyName: "",
        registrationNumber: "",
        email: "",
        phone: "",
        address: {
            country: "",
            state: "",
            city: "",
            street: "",
            number: "",
            postalCode: "",
        },
        insuranceType: "",
        additionalInfo: "",
        insuredValue: "",
        policyValue: "",
        paymentOption: "annual",
        premium: false,
        startDate: "",
        endDate: "",
        insuranceMonths: 12,
        termsAgreed: false,
        over18: false,
        discount: 0,
        commission: 0,
        tokensEarned: 0,
        rewardPercentage: 5,
        industryType: "",
        annualRevenue: "",
        employees: "",
    });
    const [companyData, setCompanyData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const annualDiscount = 10;
    const monthlyCommission = 5;

    const calculateEndDate = () => {
        if (formData.startDate && formData.insuranceMonths) {
            const start = new Date(formData.startDate);
            start.setMonth(start.getMonth() + parseInt(formData.insuranceMonths));
            const endDate = start.toISOString().split("T")[0];
            setFormData((prev) => ({
                ...prev,
                endDate: endDate,
            }));
        }
    };

    useEffect(() => {
        calculateEndDate();
    }, [formData.startDate, formData.insuranceMonths]);

    useEffect(() => {
        if (formData.registrationNumber) {
            axios
                .get(`http://localhost:4943/api/company/${formData.registrationNumber}`)
                .then((response) => {
                    if (response.data) {
                        setFormData((prev) => ({
                            ...prev,
                            ...response.data,
                        }));
                        setOwners(response.data.owners || [{
                            firstName: "",
                            lastName: ""
                        }]);
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [formData.registrationNumber]);

    const calculatePayment = () => {
        let payment = parseFloat(formData.policyValue) || 0;
        if (formData.paymentOption === "annual") {
            payment -= (annualDiscount / 100) * payment;
            formData.tokensEarned = (formData.rewardPercentage / 100) * formData.insuredValue;
        } else {
            payment += (monthlyCommission / 100) * payment;
            formData.tokensEarned = 0;
        }
        return payment.toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");  // Verifica dacă funcția este apelată
        setIsSubmitting(true);

        if (!isAuthenticated) {
            alert("You must log in to submit the form.");
            login();
            setIsSubmitting(false);
            return;
        }

        if (!backendActor) {
            console.error("Backend actor is not initialized.");
            alert("Backend actor is not initialized. Please try again.");
            setIsSubmitting(false);
            return;
        }

        try {
            if (!formData.termsAgreed || !formData.over18) {
                alert("You must agree to the terms and confirm you are over 18.");
                setIsSubmitting(false);
                return;
            }

            console.log("Data before submission:", {
                formData,
                owners,
                uploadedImages,
                uploadedDocuments
            });  // Verifica datele înainte de trimitere

            // Uploading data to RESTful API
            try {
                const restApiResponse = await axios.post("http://localhost:4943/api/apply", {
                    ...formData,
                    owners,
                    uploadedImages,
                    uploadedDocuments,
                });
                console.log("REST API response:", restApiResponse);
                alert("Data successfully sent to the RESTful API!");
            } catch (restApiError) {
                console.error("Error sending data to REST API:", restApiError);
                alert("Error sending data to REST API. Please check console.");
                setIsSubmitting(false);
                return;
            }

            // Adding the company to the Motoko backend
            try {
                const principal = await backendActor.getCallerPrincipal();
                const company = {
                    ...formData,
                    insuredValue: BigInt(formData.insuredValue || 0),
                    policyValue: BigInt(formData.policyValue || 0),
                    insuranceMonths: BigInt(formData.insuranceMonths || 0),
                    discount: BigInt(annualDiscount),
                    commission: BigInt(monthlyCommission),
                    tokensEarned: BigInt(formData.tokensEarned || 0),
                    annualRevenue: BigInt(formData.annualRevenue || 0),
                    employees: BigInt(formData.employees || 0),
                };

                console.log("Company data before backend submission:", {
                    principal,
                    company
                }); // Verify the final data

                const result = await backendActor.addCompany(principal, company);
                console.log("Backend canister response:", result); // Verifica răspunsul canisterului

                if (result) {
                    alert("Company successfully added to the backend canister!");
                    setCompanyData(prevData => [...prevData, company]); // Update the local state to reflect the new entry

                } else {
                    alert("Failed to add company data to the backend.");
                }
            } catch (backendError) {
                console.error("Error adding company to backend:", backendError);
                alert("Error adding company to backend. Please check console.");
            }
        } catch (error) {
            console.error("An error occurred during submission:", error);
            alert("An error occurred during submission. Please check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleOwnerChange = (index, e) => {
        const { name, value } = e.target;
        const updatedOwners = [...owners];
        updatedOwners[index][name] = value;
        setOwners(updatedOwners);
    };

    const addOwner = () => {
        setOwners([...owners, {
            firstName: "",
            lastName: ""
        }]);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedImageLinks = [];

        for (const file of files) {
            const ipfsUrl = await uploadToIPFS(file);
            if (ipfsUrl) {
                uploadedImageLinks.push(ipfsUrl);
            }
        }
        setUploadedImages(uploadedImageLinks);
    };

    const handleDocumentUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedDocumentLinks = [];

        for (const file of files) {
            const ipfsUrl = await uploadToIPFS(file);
            if (ipfsUrl) {
                uploadedDocumentLinks.push(ipfsUrl);
            }
        }
        setUploadedDocuments(uploadedDocumentsLinks);
    };

    const handleLoginPrompt = () => {
        if (!isAuthenticated) {
            alert("Please log in to access this section.");
            login();
        } else {
            setHasAccount(true);
        }
    };

    const handleLogoutClick = () => {
        logout();
        setHasAccount(null);
        setCompanySize(null);
        setFormData({
            companyName: "",
            registrationNumber: "",
            email: "",
            phone: "",
            address: {
                country: "",
                state: "",
                city: "",
                street: "",
                number: "",
                postalCode: "",
            },
            insuranceType: "",
            additionalInfo: "",
            insuredValue: "",
            policyValue: "",
            paymentOption: "annual",
            premium: false,
            startDate: "",
            endDate: "",
            insuranceMonths: 12,
            termsAgreed: false,
            over18: false,
            discount: 0,
            commission: 0,
            tokensEarned: 0,
            rewardPercentage: 5,
            industryType: "",
            annualRevenue: "",
            employees: "",
        });
    };

    return (
        <div>
            <Container>
                {hasAccount === null ? (
                    <div>
                        <h2>Do you have an account?</h2>
                        {!isAuthenticated ? (
                            <>
                                <Button className="btn btn-primary" onClick={handleLoginPrompt}>
                                    Login to Continue
                                </Button>
                                <Button
                                    className="btn btn-secondary"
                                    onClick={() => setHasAccount(false)}
                                >
                                    Continue as Guest
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button className="btn btn-danger" onClick={handleLogoutClick}>
                                    Logout
                                </Button>
                                <Button
                                    className="btn btn-secondary"
                                    onClick={() => setHasAccount(true)}
                                >
                                    Welcome and pressme for next step!
                                </Button>
                            </>
                        )}
                    </div>
                ) : (

                    <>
                        <Container style={{ margin: '20px' }}>
                            <h2>Select Company Size</h2>
                            <div style={{ marginBottom: "5px" }}>
                                <label className="radio-button">
                                    <input
                                        type="radio"
                                        name="companySize"
                                        value="micro"
                                        checked={companySize === "micro"}
                                        onChange={() => setCompanySize("micro")}
                                    />
                                    Micro Company
                                </label>{" "}
                                <label className="radio-button">
                                    <input
                                        type="radio"
                                        name="companySize"
                                        value="small"
                                        checked={companySize === "small"}
                                        onChange={() => setCompanySize("small")}
                                    />
                                    Small Company
                                </label>
                                <label className="radio-button">
                                    <input
                                        type="radio"
                                        name="companySize"
                                        value="large"
                                        checked={companySize === "large"}
                                        onChange={() => setCompanySize("large")}
                                    />
                                    Large Company
                                </label>
                            </div>
                        </Container>
                        {companySize && (
                            <>
                                <Container className="input-fild">
                                    <h3>Company Information</h3>
                                    <input
                                        type="text"
                                        name="companyName"
                                        placeholder="Company Name"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="registrationNumber"
                                        placeholder="Registration Number"
                                        value={formData.registrationNumber}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="industryType"
                                        placeholder="Industry Type"
                                        value={formData.industryType}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        name="annualRevenue"
                                        placeholder="Annual Revenue"
                                        value={formData.annualRevenue}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        name="employees"
                                        placeholder="Number of Employees"
                                        value={formData.employees}
                                        onChange={handleInputChange}
                                    />
                                </Container>
                                <Container className="input-fild">
                                    <h3>Owner Information</h3>
                                    <Container>
                                        {owners.map((owner, index) => (
                                            <div key={index} style={{ marginBottom: "5px" }}>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    value={owner.firstName}
                                                    onChange={(e) => handleOwnerChange(index, e)}
                                                />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    value={owner.lastName}
                                                    onChange={(e) => handleOwnerChange(index, e)}
                                                />
                                            </div>
                                        ))}
                                    </Container>
                                </Container>
                                <Container >
                                    <Row>
                                        <Button onClick={addOwner}>Add More Owners/Partners</Button>
                                    </Row>
                                </Container>
                                <Container className="input-fild">
                                    <h3>Company Address</h3>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.address.country}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State/Province"
                                        value={formData.address.state}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.address.city}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Street"
                                        value={formData.address.street}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="number"
                                        placeholder="Street Number"
                                        value={formData.address.number}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        value={formData.address.postalCode}
                                        onChange={handleAddressChange}
                                    />
                                </Container>
                                <Container className='input-fild'>
                                    <h3>What Do You Want to Insure?</h3>
                                    <select
                                        name="insuranceType"
                                        value={formData.insuranceType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a Type</option>
                                        <option value="static">Static Object</option>
                                        <option value="mobile">Mobile Object</option>
                                    </select>
                                </Container>
                                <Container className='input-fild'>
                                    {formData.insuranceType === "static" && (
                                        <div>
                                            <h4>Static Object Details</h4>
                                            <input
                                                type="text"
                                                name="gpsCoordinates"
                                                placeholder="GPS Coordinates"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                            />
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                multiple
                                                onChange={handleDocumentUpload}
                                            />
                                            <textarea
                                                name="description"
                                                placeholder="Detailed Description"
                                                onChange={handleInputChange}
                                                style={{ width: '380px' }}
                                            />
                                        </div>
                                    )}
                                </Container>
                                <Container className='input-fild checkBoxes-fild'>
                                    {formData.insuranceType === "mobile" && (
                                        <div>
                                            <h4>Mobile Object Details</h4>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                            />
                                            <textarea
                                                name="description"
                                                placeholder="Detailed Description"
                                                onChange={handleInputChange}
                                                style={{ width: '380px' }}
                                            />
                                        </div>
                                    )}
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h3>Additional Info</h3>
                                    <textarea
                                        name="additionalInfo"
                                        placeholder="Any additional details about the insured asset..."
                                        value={formData.additionalInfo}
                                        onChange={handleInputChange}
                                        style={{ width: '380px' }}
                                    />
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h3>Insurance Details</h3>
                                    <div style={{ marginBottom: '5px' }}>
                                        <input
                                            type="number"
                                            name="insuredValue"
                                            placeholder="Insured Value"
                                            value={formData.insuredValue}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '5px' }}>
                                        <input
                                            type="number"
                                            name="policyValue"
                                            placeholder="Policy Value"
                                            value={formData.policyValue}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h3>Payment Options</h3>
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentOption"
                                            value="annual"
                                            checked={formData.paymentOption === "annual"}
                                            onChange={handleInputChange}
                                        />
                                        Annual Payment (10% discount)
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentOption"
                                            value="monthly"
                                            checked={formData.paymentOption === "monthly"}
                                            onChange={handleInputChange}
                                        />
                                        Monthly Payment (5% commission)
                                    </label>
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h3>Premium Option</h3>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="premium"
                                            checked={formData.premium}
                                            onChange={handleInputChange}
                                            disabled={formData.paymentOption === "monthly"}
                                        />
                                        I want Premium Insurance (only available for annual payments)
                                    </label>
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h3>Legal</h3>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="termsAgreed"
                                            checked={formData.termsAgreed}
                                            onChange={handleInputChange}
                                        />
                                        I agree to the terms and conditions.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="over18"
                                            checked={formData.over18}
                                            onChange={handleInputChange}
                                        />
                                        I am over 18 years old.
                                    </label>
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h3>Insurance Period</h3>
                                    <div style={{ marginBottom: "5px" }}>
                                        <label>Start Date: </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div style={{ marginBottom: "5px" }}>
                                        <label>Insurance Duration (Months): </label>
                                        <select
                                            name="insuranceMonths"
                                            value={formData.insuranceMonths}
                                            onChange={handleInputChange}
                                        >
                                            {[12, 24, 36, 48, 60].map(months => (
                                                <option key={months} value={months}>{months} Months</option>
                                            ))}
                                        </select>
                                    </div>
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <h4>Calculated Payment: {calculatePayment()}</h4>
                                </Container>
                                <Container className="input-fild checkBoxes-fild">
                                    <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                </Container>
                                {/* Display companyData at the end */}
                                {companyData.length > 0 && (
                                    <div>
                                        <h3>Submitted Company Data:</h3>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Company Name</th>
                                                    <th>Registration Number</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Insured Value</th>
                                                    <th>Policy Value</th>
                                                    {/* Add more headers as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {companyData.map((company, index) => (
                                                    <tr key={index}>
                                                        <td>{company.companyName}</td>
                                                        <td>{company.registrationNumber}</td>
                                                        <td>{company.email}</td>
                                                        <td>{company.phone}</td>
                                                        <td>{company.insuredValue}</td>
                                                        <td>{company.policyValue}</td>
                                                        {/* Add more data as needed */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default InsuranceForm;
