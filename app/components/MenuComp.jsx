import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NameAndSign from "./NameAndSign";

function MenuComp({ setMenuOpen }) {
  const [nameOpen, setNameOpen] = useState(false);
  const { user } = UserAuth();
  const userUid = user?.uid;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <div>
      {nameOpen ? (
        <NameAndSign />
      ) : (
        <div className="pt-40 p-10">
          <ToastContainer />
          <ul className="">
            <li className="text-xl">
              <Link href="/">Home</Link>
            </li>
            <li className="text-xl pt-10" >
              <Link href="/expenseoverview">Expense Overview</Link>
            </li>
            <li className="pt-10 text-xl">
              <Link href="/investments">Investments</Link>
            </li>
            <li
              className="pt-10 text-xl"
              onClick={() => setNameOpen(!nameOpen)}
            >
              Settings
            </li>

            <li className="pt-10 text-xl" onClick={handleSignOut}>
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuComp;
