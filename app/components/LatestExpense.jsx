"use client";
import {
  PlusCircleIcon,
  ShapesIcon,
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
  PiggyBank,
  ShieldQuestion,
} from "lucide-react"; // Import necessary icons
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const LatestExpense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const { user } = UserAuth();
  const userUid = user?.uid;


  // Expense and income categories with icons and colors
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

  // Function to get the relevant icon and color based on the category
  const getCategoryDetails = (category) => {
    const matchedCategory = expenseCategories.find(
      (cat) => cat.label === category
    );
    return matchedCategory
      ? { icon: matchedCategory.icon, color: matchedCategory.color }
      : { icon: ShapesIcon, color: "#555259" }; // Default color for 'Others'
  };

  // Group expenses by month
  const groupExpensesByMonth = (expenses) => {
    const grouped = expenses.reduce((acc, curr) => {
      const month = moment(curr.date.toDate()).format("MMMM YYYY"); // Group by month
      if (!acc[month]) acc[month] = [];
      acc[month].push(curr);
      return acc;
    }, {});
    return grouped;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userUid) return;

      try {
        const q = query(
          collection(db, "ExpenseDetails"),
          where("userUid", "==", userUid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let expenseArr = [];
          snapshot.forEach((doc) => {
            expenseArr.push({ ...doc.data(), id: doc.id });
          });
          setExpenseData(expenseArr);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userUid]);

  // Group expenses by month
  const groupedExpenses = groupExpensesByMonth(expenseData);

  return (
    <div>
      <div className="text-center text-2xl text-[#FF9800] pb-2">Expense</div>
      <div className="overflow-y-auto h-64 p-1">
        <ul className="pb-5">
          {/* Iterate through the grouped months */}
          {Object.keys(groupedExpenses).map((month) => (
            <div key={month} className="mb-4">
              {/* Display month header */}
              <div className="text-lg text-center text-white py-1 rounded">
                {month}
              </div>
              {/* Display expenses for that month */}
              {groupedExpenses[month].map((expense) => {
                const { icon: CategoryIcon, color } = getCategoryDetails(
                  expense.category
                );
                return (
                  <li key={expense.id} className="flex p-2 justify-between">
                    <div className="flex">
                      {/* Category Icon with color */}
                      <div
                        className="rounded-full w-12 h-12 flex justify-center pt-3"
                        style={{ backgroundColor: color }}
                      >
                        <CategoryIcon size={24} color="#fff" />
                      </div>
                      {/* Category and Date */}
                      <div className="flex flex-col">
                        <div className="pl-2 text-lg">{expense.category}</div>
                        <div className="pl-2 opacity-70">
                          {expense.date && expense.date.toDate
                            ? moment(expense.date.toDate()).format("MMM Do YYYY")
                            : "No date available"}
                        </div>
                      </div>
                    </div>
                    {/* Expense Amount */}
                    <div className="pt-3 text-xl">₹{expense.amount}</div>
                  </li>
                );
              })}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LatestExpense;
