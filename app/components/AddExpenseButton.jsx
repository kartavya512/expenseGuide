"use client";
import { collection, addDoc } from "firebase/firestore";
import moment from "moment";

import { db, auth } from "../firebase";
import {
  CalendarDays,
  X,
  Pencil,
  RefreshCcw,
  Layers2,
  Utensils,
  ShoppingBag,
  TrainFront,
  House,
  HandCoins,
  Drama,
  Fuel,
  Plane,
  Hospital,
  GraduationCap,
  ShoppingBasket,
  Gift,
  Dumbbell,
  Bean,
  Wallet,
  ShieldQuestion,
  Banknote,
  PiggyBank,
  Landmark,
} from "lucide-react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import "react-datepicker/dist/react-datepicker.css";
import { notFound } from "next/navigation";
import { set } from "date-fns";

function AddExpenseButton({ setAddOpen }) {
  const [value, setValue] = useState();
  const [openRecurrence, setOpenRecurrence] = useState(false);
  const [recurrence, setRecurrence] = useState("Never");
  const [openCategory, setOpenCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [isExpense, setIsExpense] = useState(true);
  const [note, setNote] = useState("");

  const categoryRef = useRef(null);
  const [categoryArg, setCategoryArg] = useState(null);
  const [color, setColor] = useState("green");
  const [startDate, setStartDate] = useState(new Date());
  const [expenseDetails, setExpenseDetails] = useState({
    amount: "",
    date: "",
    note: "",
    category: "",
    recurrence: "",
    icon: "",
  });
  const [user, setUser] = useState(false);

  // Calculate dynamic width based on the number of digits, but cap it to a max-width
 

  // Adjust max width to fit the largest number
  const handleChanges = (e) => {
    const newValue = e.target.value;
    // Ensure the new value is within the allowed range
    if (newValue === 0 || (newValue >= 0 && newValue <= 10000000)) {
      setValue(newValue);
    }
  };

  // Adjust the input width dynamically based on the integer value
  const getInputWidth = () => {
    const baseWidth = 1; // Base width for the input
    const digitWidth = 1; // Width for each digit (in `ch`)
    const maxDigits = 15; // Maximum number of digits to cap width
    const digitCount = value > 0 ? Math.floor(Math.log10(value)) + 1 : 1; // Count digits in the integer
    return `${Math.min(baseWidth + digitCount * digitWidth, maxDigits)}ch`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const addExpenseDetails = async (e) => {
    e.preventDefault();
    if (expenseDetails.category == "Investments" && note === "") {
      alert("Please write note");
    } else {
      try {
        if (value !== "" && user) {
          const userUid = user.uid; // Get the user's UID
          await addDoc(collection(db, "ExpenseDetails"), {
            amount: value,
            date: startDate,
            note: note,
            category: expenseDetails.category,
            recurrence: recurrence,
            //icon:expenseDetails.icon,

            userName: user.displayName, // Assuming the user has a display name
            userEmail: user.email,
            userUid: userUid, // Include the user's UID in the document
          });
          //console.log(startDate,"date")
          setExpenseDetails({
            amount: "",
            date: "",
            note: "",
            category: "",
            recurrence: "",
            icon: "",
          });
          setValue("");
          setNote("");
          toast.success("Expense added successfully!");
          setAddOpen(false);
        } else {
          // console.log(expenseDetails.category)
          // console.log(startDate)
          // console.log(value)
          // console.log(recurrence)
          // console.log(expenseDetails.icon)
          // console.log(note)
          toast.error("Please add an amount!"), { transition: Slide };
        }
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Ensure the new value is within the allowed range
    if (newValue === "" || (newValue >= 0 && newValue <= 10000000)) {
      setValue(newValue);
    }
  };

  const handleRecurrenceSelect = (recurrenceType) => {
    setRecurrence(recurrenceType); // Update the recurrence value
    setOpenRecurrence(false); // Close the recurrence dropdown
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setOpenCategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryRef]);

  // Handle click outside the white background to close the category dropdown

  const expenseCategories = [
    { id: 1, label: "Food", icon: Utensils, color: "#ff7300" },
    { id: 2, label: "Shopping", icon: ShoppingBag, color: "#b50cf2" },
    { id: 3, label: "Transport", icon: TrainFront, color: "#f2d00c" },
    { id: 4, label: "Rent/Home", icon: House, color: "#857a41" },
    { id: 5, label: "EMI", icon: HandCoins, color: "#1ed9c3" },
    { id: 6, label: "Entertainment", icon: Drama, color: "#ff7300" },
    { id: 7, label: "Fuel", icon: Fuel, color: "#1e82d9" },
    { id: 8, label: "Travel", icon: Plane, color: "#7c1ed9" },
    { id: 9, label: "Healthcare", icon: Hospital, color: "#cc4797" },
    { id: 10, label: "Education", icon: GraduationCap, color: "#0d55fc" },
    { id: 11, label: "Groceries", icon: ShoppingBasket, color: "#e8602e" },
    { id: 12, label: "Gifts", icon: Gift, color: "#03ff89" },
    { id: 13, label: "Sports", icon: Dumbbell, color: "#53fcc7" },
    { id: 14, label: "Beauty", icon: Bean, color: "#3d0487" },
    { id: 15, label: "Investments", icon: PiggyBank, color: "#05f511" },
    { id: 16, label: "Others", icon: ShieldQuestion, color: "#555259" },
  ];

  // Define category data for income
  const incomeCategories = [
    { id: 1, label: "Salary", icon: Banknote, color: "#05b011" },
    { id: 2, label: "Extra Income", icon: Wallet, color: "#00ff11" },
    { id: 3, label: "Gifts", icon: Gift, color: "#03ff89" },
    { id: 4, label: "Loan", icon: Landmark, color: "#fc0394" },
    { id: 5, label: "Others", icon: ShieldQuestion, color: "#555259" },
  ];

  const categories = isExpense ? expenseCategories : incomeCategories;
  const categoryFun = (id) => {
    //console.log("jjjjj", id);
    const selectedCategory = categories.find((category) => category.id === id);
    //console.log(selectedCategory);
    //console.log(expenseDetails);
    if (selectedCategory) {
      //console.log("herlloo");
      return (
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full w-12 h-12">
            <div className="flex justify-center pt-3">
              <selectedCategory.icon
                color={selectedCategory.color}
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="w-14 h-14 rounded-full border border-dashed border-black"></div>
    );
  };

  const handleCategoryClick = (id) => {
    const selectedCategory = categories.find((category) => category.id === id);
    if (selectedCategory) {
      setColor(selectedCategory.color); // Change background color to category color
      setCategorySelected(true);

      // Update the expenseDetails with the selected category label
      setExpenseDetails((prevDetails) => ({
        ...prevDetails,
        category: selectedCategory.label,
        icon: selectedCategory.icon, // Optionally update the icon as well
      }));
    }
    setCategoryArg(id); // Update the selected category
  };
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
  };

  return (
    <div className="relative h-screen overflow-y-scroll">
      {/* Header Section */}

      <div style={{ backgroundColor: color }} className="h-40">
        <div className="flex p-4 text-center  ">
          <X
            size={26}
            className="text-white"
            onClick={() => setAddOpen(false)}
          />
          <div className="flex justify-center text-center">
            <div></div>
            <div className="text-center pl-20 text-xl text-white">
              {categorySelected && isExpense
                ? expenseDetails.category // Correctly accessing the category label
                : categorySelected && !isExpense
                ? incomeCategories.category // Assuming similar state management for income
                : "Add Expense"}
            </div>
          </div>
        </div>
        <div className="p-8 ">
          <div className="flex justify-between items-center max-w-full">
            <div>
              {openCategory ? (
                <div className="w-14 h-14 rounded-full border border-dashed border-black"></div>
              ) : (
                <div>{categoryFun(categoryArg)}</div>
              )}
            </div>
            <div className="">
              <div className="flex">
                <div className="pt-[0.35rem] text-xl">₹</div>
                <input
                  type="number"
                  value={value}
                  onChange={handleChanges}
                  className="text-2xl placeholder:text-white text-white p-1 rounded-lg focus:outline-none focus:ring-0"
                  
                  max={10000000}
                  placeholder="0"
                  
                  style={{ width: getInputWidth(), backgroundColor: color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-8">
        {/* Date Section */}
        <div className="flex justify-between pt-10 h-20">
          <div className="flex">
            <CalendarDays size={32} color={color} />
            <div className="pl-3 text-lg">
              <DatePicker
                className="bg-black text-white rounded-lg w-[60%] focus:outline-none focus:ring-0"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="p-2 text-sm border border-dashed rounded-full opacity-75">
            Yesterday?
          </div>
        </div>

        {/* Notes Section */}
        <div className="flex pt-10">
          <Pencil size={30} color={color} />
          <div className="pl-3 pt-1">
            <input
              className="bg-black text-white placeholder:text-white focus:outline-none focus:ring-0"
              type="text"
              placeholder="Write a note"
              value={note}
              onChange={handleNoteChange}
            />
          </div>
        </div>

        {/* Category Section */}
        <div
          className="pt-10 flex cursor-pointer"
          onClick={() => setOpenCategory(!openCategory)}
        >
          <Layers2 size={28} strokeWidth={1.5} color={color} />
          <div className="pl-3">Category</div>
        </div>

        {/* Recurrence Section */}
        <div className="pt-10">
          <div
            className="flex justify-between pt-1 pb-1 cursor-pointer"
            onClick={() => setOpenRecurrence(!openRecurrence)}
          >
            <div className="flex">
              <RefreshCcw size={28} color={color} />
              <div className="pl-3 pt-1">Recurrence</div>
            </div>
            <div className="pt-1">{recurrence}</div>
          </div>
        </div>

        {/* Recurrence Dropdown */}
        {openRecurrence && (
          <div className="flex justify-between ">
            <div></div>
            <ul className="text-white bg-gray-700 w-1/2 p- h-40 overflow-y-auto absolute right-2">
              {[
                "Never",
                "Every day",
                "Every 2 days",
                "Every work day",
                "Every week",
                "Every 2 weeks",
                "Every 4 weeks",
                "Every month",
                "Every 2 months",
                "Every 3 months",
                "Every 6 months",
                "Every year",
              ].map((item) => (
                <li
                  key={item}
                  className="p-2 hover:bg-black cursor-pointer"
                  onClick={() => handleRecurrenceSelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Category Dropdown */}
      {openCategory && (
        <div
          ref={categoryRef}
          className="fixed bottom-0 left-0 right-0 bg-gray-900 h-[40%] z-10 p-5 "
        >
          <div className="text-white">Transaction Category</div>
          <div className="flex justify-center py-5">
            <div className="relative w-36 border border-gray-500 rounded-3xl">
              {/* Toggle background, moves between Expense and Income */}
              <div
                className={`absolute left-0 w-1/2 h-full rounded-full transition-transform ${
                  isExpense ? "bg-green-500" : "translate-x-full bg-blue-500"
                }`}
              ></div>

              {/* Labels for Expense and Income */}
              <div className="flex items-center justify-between relative z-10">
                <div
                  className={`w-1/2 text-center py-1 cursor-pointer transition-colors ${
                    isExpense ? "text-white font-semibold" : "text-gray-400"
                  }`}
                  onClick={() => setIsExpense(true)}
                >
                  Expense
                </div>
                <div
                  className={`w-1/2 text-center py-1 cursor-pointer  transition-colors ${
                    !isExpense ? "text-white font-semibold" : "text-gray-400"
                  }`}
                  onClick={() => setIsExpense(false)}
                >
                  Income
                </div>
              </div>
            </div>
          </div>

          {/* Content based on the toggle selection */}

          <div className="rounded-lg">
            <div className="max-h-44 overflow-y-auto">
              <div className="grid grid-cols-3 gap-5">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setCategoryArg(category.id)}
                  >
                    <div
                      className="flex flex-col items-center"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div
                        className="bg-black rounded-full w-12 h-12"
                        onClick={() => setOpenCategory(false)}
                      >
                        <div className="flex justify-center pt-3">
                          <category.icon
                            color={category.color}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                      <div className="text-sm p-1 pt-2">{category.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button Section */}
      <div
        className={`pt-60 w-full  flex justify-center z-0 ${
          openCategory ? "hidden" : ""
        }`}
      >
        {categorySelected ? (
          <button
            className="w-10/12 text-center bg-green-500 p-2 rounded-2xl"
            onClick={addExpenseDetails}
          >
            Add Transaction
          </button>
        ) : (
          <button
            disabled
            className="w-10/12 text-center bg-slate-500 p-2 rounded-2xl"
          >
            Select category
          </button>
        )}
      </div>
    </div>
  );
}

export default AddExpenseButton;
