import React, { useState } from 'react';
import './style.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const handleSignIn = async () => {
  //   if (!username || !password) {
  //     setErrorMessage('Please fill in both username and password.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai', {  // Adjust the URL
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();

  //     if (data === "Sign-in successful!") {
  //       console.log('Sign-in successful!');
  //       // Perform any additional actions after sign-in
    
  //     } else {
  //       setErrorMessage(data);  // Display the error returned from the backend
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setErrorMessage('Network error occurred.');
  //   }
  // };


  const handleSignIn = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      setErrorMessage('Please fill in both username and password.');
      return;
    }
  
    try {
      // Make the fetch request to sign in
      const response = await fetch('https://gcmportfolio.netlify.app/projectAgritek', {  // Adjust the URL if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.text();  // Use text() to handle simple string responses
  
      if (data.includes("Sign-in successful!")) {
        console.log('Sign-in successful!');
        
        // Redirect to the About Us page (or update the URL if needed)
        window.location.href = '/about-us';  // Redirect to the About Us page
  
        // Optionally, you can fetch and display About Us content on the same page
        // Assuming there's a div with id 'aboutUsContent' to display the content
        const aboutUsResponse = await fetch('/about-us');  // Fetch About Us content
        const aboutUsContent = await aboutUsResponse.text();
        document.getElementById("aboutUsContent").innerHTML = aboutUsContent;  // Insert About Us content
        
      } else {
        setErrorMessage(data);  // Display the error returned from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Network error occurred.');
    }
  };
  

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <p>
        <a href="/forgot-password">Forgot your password?</a>
      </p>
      <p>
        Don't have an account? <a href="/sign-up">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
