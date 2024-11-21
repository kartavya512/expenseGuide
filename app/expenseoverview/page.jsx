"use client";
import React, { useEffect, useState } from "react";
import MenuComp from "../components/MenuComp";
import { PlusCircleIcon, Menu, X, Trash2 } from "lucide-react";
import { ShapesIcon } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  collection,
  where,
} from "firebase/firestore";
import Spinner from "../components/LoadingSpinner"; // Import the spinner component

import {
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
} from "lucide-react";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { user } = UserAuth();
  const userUid = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!userUid) {
        setIsLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "ExpenseDetails"),
          where("userUid", "==", userUid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const expenseArr = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((expense) => expense.category !== "Investments");

          setExpenseData(expenseArr);
          setIsLoading(false); // Stop loading once data is fetched
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userUid]);

  const groupedByMonth = expenseData.reduce((acc, expense) => {
    const date = expense.date?.toDate ? moment(expense.date.toDate()) : null;
    const month = date ? date.format("MMMM YYYY") : "Unknown Month";
    if (!acc[month]) acc[month] = [];
    acc[month].push(expense);
    return acc;
  }, {});

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "ExpenseDetails", id));
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

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

  return (
    <div className="p-8">
      <ToastContainer />
      {menuOpen ? (
        <div className="bg-gray-900 h-screen absolute right-0 w-10/12 top-0">
          <X
            size={36}
            color="#ffffff"
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-8"
          />
          <MenuComp />
        </div>
      ) : (
        <div className="flex justify-between">
          <div>
            <div className="text-lg opacity-70">Welcome Back</div>
            <div className="text-xl">Kartavya</div>
          </div>
          <Menu size={32} color="#ffffff" onClick={() => setMenuOpen(true)} />
        </div>
      )}
      <div className="pt-10">
        {isLoading ? ( // Show spinner while loading
          <div className="flex justify-center items-center h-[40rem]">
            <Spinner size={50} />
          </div>
        ) : (
          <div className="overflow-y-scroll h-[40rem]">
            {Object.keys(groupedByMonth).map((month) => (
              <div key={month}>
                <h2 className="text-2xl font-semibold mt-4">{month}</h2>
                <ul>
                  {groupedByMonth[month].map((expense) => {
                    const category = expenseCategories.find(
                      (cat) => cat.label === expense.category
                    );
                    const Icon = category?.icon || ShapesIcon;

                    return (
                      <li key={expense.id} className="flex justify-between p-2">
                        <div className="flex">
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full"
                            style={{ backgroundColor: category?.color || "red" }}
                          >
                            <Icon size={24} color="#fff" />
                          </div>
                          <div className="pl-2">
                            <div className="text-lg">{expense.category}</div>
                            <div>
                              {expense.date?.toDate
                                ? moment(expense.date.toDate()).format(
                                    "MMM Do YYYY"
                                  )
                                : "No date available"}
                            </div>
                          </div>
                        </div>
                        <div>₹{expense.amount}</div>
                        <Trash2
                          size={20}
                          className="cursor-pointer"
                          onClick={() => deleteItem(expense.id)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
