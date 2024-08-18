import React from 'react';

function Hero() {
  return (
    <>
      <section id="hero" class="lg:px-10 bg-cover bg-center lg:bg-top bg-no-repeat bg-[#97b0aa]">
        <div class="container h-fit flex flex-col justify-start mx-auto space-y-16 px-5 lg:px-10 2xl:px-0 py-20 md:py-40">
          <div class="w-full space-y-5">
            <h1 class="font-semibold text-5xl md:text-6xl xl:text-7xl 2xl:text-7xl text-white">
              A Comprehensive
            </h1>
            <p class="font-semibold text-5xl md:text-6xl xl:text-7xl 2xl:text-7xl text-white">
              Blockchain-Based Insurance Solution
            </p>
            <p class="font-semibold text-5xl md:text-6xl xl:text-7xl 2xl:text-7xl text-white">
              for Startups and MSMEs
            </p>
          </div>
          <div class="w-full space-y-8">
            <p class="text-lg md:text-base xl:text-lg 2xl:text-2xl text-white">
              Decentralized Insurance Tailored for Startups and MSMEs, Powered by Blockchain
            </p>
            <button id="openModal" class="py-4 px-8 font-medium lg:text-base rounded-md text-white bg-[#466F65] hover:bg-[#354b45] transition-colors duration-300 ease-in-out">Talk to an Expert</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;