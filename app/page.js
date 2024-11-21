"use client"
import React, { useState, useEffect } from 'react';


import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import Image from "next/image";
import Signup from "./signup/page";

import Hero from "./components/Hero";

import Link from "next/link";
import MainDash from "./components/MainDash";
import { ToastContainer, toast } from 'react-toastify';
import NameAndSign from './components/NameAndSign';


export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nameOpen, setNameOpen] = useState(true);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setNameOpen(true)
    });

    return () => unsubscribe();
  }, []);
  return (
    <div>

      {user ?  <MainDash /> : <Hero />}
    </div>
  );
}
