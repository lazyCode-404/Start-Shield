import React from 'react';
// import { useState } from 'react';
// import { start_shield_backend } from 'declarations/start_shield_backend';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   start_shield_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <main>
      {/* <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section> */}
      <NavBar />
      <Hero />
      <Footer />
    </main>
  );
}

export default App;
