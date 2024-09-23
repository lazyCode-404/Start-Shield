// import React, { useState } from 'react';
// import './style.css';

// const CreateAccount = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [confirmEmail, setConfirmEmail] = useState('');
//   const [dob, setDob] = useState('');
//   const [address, setAddress] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');

//   const handleCreateAccount = async () => {
//     // Validate input fields
//     if (!username || !email || !dob || !address || !firstName || !lastName || !password || !confirmPassword || !selectedRole) {
//       console.error('Please fill in all required fields.');
//       return;
//     }
  
//     // Validate email and confirm email
//     if (email !== confirmEmail) {
//       console.error('Email addresses do not match.');
//       return;
//     }
  
//     // Validate password and confirm password
//     if (password !== confirmPassword) {
//       console.error('Passwords do not match.');
//       return;
//     }
  
//     // Call backend API to create the account
//     try {
//       const response = await fetch('http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai', {  // Adjust URL to your backend API endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           dob,
//           address,
//           firstName,
//           lastName,
//           password,
//           confirmPassword  // Include all fields expected by the backend
//         }),
//       });
  
//       if (response.ok) {
//         console.log('Account created successfully!');
//         // Redirect to login page or perform other actions
//       } else {
//         console.error('Error creating account');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };
  
  

//   return (
//     <div className="create-account-form">
//       <div >
//         <h2>Create an Account</h2>
//         <input
//           type="text"
//           placeholder="Firstname"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Lastrname"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Confirm Email"
//           value={confirmEmail}
//           onChange={(e) => setConfirmEmail(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="Date of Birth"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         {/* Add other input fields (first name, last name, etc.) similarly */}
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />     
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//           <select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//         >
//           <option value="">Select Role</option>
//           <option value="user">User</option>
//           <option value="admin">Administrator</option>
//           <option value="ceo">CEO</option>
//           {/* Add other role options here */}
//         </select>
//       </div>
//       <button onClick={handleCreateAccount}>Create Account</button>
//     </div>
//   );
// };

// export default CreateAccount;



import React, { useState } from 'react';
import './style.css';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async () => {
    if (!username || !email || !dob || !address || !firstName || !lastName || !password || !confirmPassword || !selectedRole) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (email !== confirmEmail) {
      setErrorMessage('Email addresses do not match.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai', {  // Adjust the URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username, email, confirmEmail, dob, address, firstName, lastName, password, confirmPassword, selectedRole
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Account created successfully!');
      } else {
        setErrorMessage(data);  // Display the error returned from the backend
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error occurred.');
    }
  };


  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   actors_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <div className="create-account-form">
      <h2>Create an Account</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Firstname"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lastname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="email"
        placeholder="Confirm Email"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
      />
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="ceo">CEO</option>
      </select>
      <button onClick={handleCreateAccount}>Create Account</button>

      {/* <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form> */}
    </div>
  );
};

export default CreateAccount;
