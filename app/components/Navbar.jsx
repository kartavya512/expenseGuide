"use client";
import Link from "next/link";
import React from "react";

import {usePathname } from "next/navigation";

const Navbar = () => {
  
  const currentRoute = usePathname();
  
  return (
    <div className="">
      <div className="flex items-center ">
       
       
      </div>
      <div className="flex items-center justify-center">
        <div className="fixed  top-0 shadow lg:w-[30%]   rounded-xl mt-4 py-2 px-4 lg:px-0 ">
          <div className="">
            <div className="flex space-x-10  justify-center text-lg font-semibold">
              <Link href="/" passHref>
              
                <div
                  className={`text-lg font-medium ${
                    currentRoute === "/"
                      ? "  text-green-600"
                      : "text-white"
                  }`}
                >
                  {" "}
                  Home
                </div>
              </Link>
              <div
                className={`text-lg font-medium ${
                  currentRoute === "/myexpenses"
                    ? "  text-green-600"
                    : "text-white"
                }`}
              >
                
                <Link href="/myexpenses" passHref>
                  My Expenses
                </Link>
              </div>
              <div
                className={`text-lg font-medium ${
                  currentRoute === "/reports"
                    ? "  text-green-600"
                    : "text-white"
                }`}
              >
                
                <Link href="/reports" passHref>
                  Reports
                </Link>
              </div>
              <div
                className={`text-lg font-medium ${
                  currentRoute === "/login"
                    ? "  text-green-600"
                    : "text-white"
                }`}
              >
                <Link href="/login" passHref>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
