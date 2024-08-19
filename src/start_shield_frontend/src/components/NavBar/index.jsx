import React from 'react';

function NavBar() {
  return (
    <>
      <nav class="inter-normal lg:px-10 bg-[#97b0aa]" style={{ backgroundColor: '#020202', position: 'fixed', width: '100%', top: 0 }}>
        <div class="container h-20 flex justify-between items-center mx-auto px-5 2xl:px-0 py-4">
          <a href="#"><img class="h-8" src="..\..\..\dist\assets\images\NavBar\start-shield-black-logo.jpg" alt=""></img></a>
          {/* <div id="menu" class="w-10 h-10 bg-[url('')] hover:bg-[url('')] bg-cover bg-center bg-no-repeat hover:cursor-pointer lg:hidden"></div> */}
          <div class="lg:flex items-center lg:space-x-10 hidden">
            <ul class="flex lg:space-x-10">
            <li class="font-medium lg:text-base text-white hover:text-[#00a859]">
                <a class="text-design" href="#">Homepage</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="hover-primary-blue" href="#">Insurance Solutions</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Tokenization and Staking</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Governance Portal</a>
              </li> 
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Educational Resources</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Blog and news</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">User Dashboard</a>
              </li> 
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">About Us</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Legal and Compliance</a>
              </li>
{/*               
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Products</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Ecosystem</a>
              </li>
              <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
                <a class="" href="#">Company</a>
              </li> */}
             
             
            </ul>
            {/* <button class="py-2.5 px-5 font-medium lg:text-base rounded-md text-white bg-[#466F65] hover:bg-[#00bcd4] transition-colors duration-300 ease-in-out">Log In</button> */}
          </div>
        </div>

        <div id="mobile-menu" class="h-screen ps-5 pt-5 bg-[#97b0aa] hidden lg:hidden">
          <ul class="space-y-5">
            <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
              <a class="" href="#">Products</a>
            </li>
            <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
              <a class="" href="#">Ecosystem</a>
            </li>
            <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
              <a class="" href="#">Company</a>
            </li>
            <li class="font-medium lg:text-base text-white hover:text-[#00bcd4]">
              <a class="" href="#">Blog</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;