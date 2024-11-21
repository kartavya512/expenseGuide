import React from 'react';
import Navbar from './Navbar';
import Link from "next/link";
import Expense from "../../public/expense.webp";
import Image from "next/image";

const Hero = () => {
  return (
    <div className='fixed'>
      <div className="lg:block hidden">

      <Navbar/></div>
      <div className=''>
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
          ExpesneGuide
        </div>
      </div>

      <div className="flex  lg:flex-row justify-evenly flex-col-reverse h-screen p-5 lg:p-40 pt-2 lg:pt-40">
        <div className="lg:w-1/2">
          <div className="lg:pt-5 font-semibold lg:text-3xl text-2xl text-green-400">
            Take Control of Your Finance
          </div>
          <div className="lg:pt-5 pt-5">
            Track your expenses effortlessly and gain financial clarity with our intuitive expense tracker. Stay on top of your spending, save smarter, and achieve your financial goals.
          </div>
          <div className="lg:pt-7 pt-5">
            <ul className="lg:pl-5 text-white">
              <li className="flex">
                <div className="before:content-['•'] before:text-green-400 before:mr-2 flex items-baseline">
                  <div className="font-bold text-green-400">Simple & Intuitive:</div>
                  <div className="lg:pl-3">Easy-to-use interface for seamless expense tracking.</div>
                </div>
              </li>
              <li className="flex pt-5">
                <div className="before:content-['•'] before:text-green-400 before:mr-2 flex items-baseline">
                  <div className="font-bold text-green-400">Real-Time Insights:</div>
                  <div className="lg:pl-3">Get instant insights into your spending habits.</div>
                </div>
              </li>
              <li className="flex pt-5">
                <div className="before:content-['•'] before:text-green-400 before:mr-2 flex items-baseline">
                  <div className="font-bold text-green-400">Secure & Private:</div>
                  <div className="pl-3">Your financial data is safe and secure with us.</div>
                </div>
              </li>
            </ul>
            
            

          </div>
          <div className="pt-10">
          <Link href="/signup"><button className="bg-green-400 p-2 text-gray-50 rounded-md">Start Tracking Now</button></Link></div>
        </div>
        <div className=" lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
          <Image
          priority={true}
            src={Expense}
            alt="Expense tracker illustration"
            width={300}  // Specify the width for larger screens
            height={300} // Specify the height for larger screens
            className="w-[75%]  lg:w-full max-w-xs lg:max-w-lg" // Adjust width based on screen size
          />
        </div>
      </div>
    </div></div>
  )
}

export default Hero