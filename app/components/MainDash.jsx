"use client";
import React, { useEffect, useState } from "react";
import { PlusCircleIcon, Menu, X } from "lucide-react";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import TailwindBarChart from "./TailwindBarChart";
import AddExpenseButton from "./AddExpenseButton";
import LatestExpense from "./LatestExpense";
import MenuComp from "./MenuComp";
import LoadingSpinner from "./LoadingSpinner"; // Create or use a spinner component

const MainDash = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = UserAuth();
  const userUid = user?.uid;
  const name = user?.displayName;

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
            const data = doc.data();
            expenseArr.push({ ...data, id: doc.id });
          });

          setExpenseData(expenseArr);

          const groupExpensesByMonth = (expenses) => {
            return expenses.reduce((acc, curr) => {
              const month = moment(curr.date.toDate()).format("MMMM");
              if (!acc[month]) {
                acc[month] = { totalAmount: 0, items: [] };
              }
              acc[month].totalAmount += parseInt(curr.amount || 0, 10); // Ensure integers
              acc[month].items.push(curr);
              return acc;
            }, {});
          };

          const monthlyData = groupExpensesByMonth(expenseArr);

          const dataForChart = Object.keys(monthlyData).map((month) => ({
            label: month.slice(0, 3),
            value: monthlyData[month].totalAmount,
          }));

          setData(dataForChart);

          const currentMonth = moment().format("MMMM");
          const currentMonthTotal = monthlyData[currentMonth]?.totalAmount || 0;

          setTotalAmount(currentMonthTotal);
          setLoading(false); // Data has loaded
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, [userUid]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner /> {/* Replace with your spinner */}
        </div>
      ) : addOpen ? (
        <AddExpenseButton setAddOpen={setAddOpen} />
      ) : menuOpen ? (
        <div className="bg-gray-900 max-h-screen min-h-screen absolute right-0 w-10/12 z-1">
          <div>
            <X
              color="#ffffff"
              size={36}
              strokeWidth={1.25}
              className="absolute right-6 top-8"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <MenuComp setMenuOpen={setMenuOpen} />
          </div>
        </div>
      ) : (
        <div className="pt-8 z-0">
          <div className="flex justify-between pl-8 pr-8">
            <div>
              <div className="text-lg opacity-70">Welcome Back</div>
              <div className="text-xl mt-[0.5px]">{name}</div>
            </div>
            <div>
              <Menu
                size={32}
                color="#ffffff"
                onClick={() => setMenuOpen(true)}
              />
            </div>
          </div>

          <div className="pl-8 pr-8 pt-10 flex flex-col justify-center items-center">
            <div className="text-lg">Your Expense</div>
            <div className="text-4xl font-bold p-2 text-[#76FF03]">
              ₹{totalAmount}
            </div>
          </div>

          <div className="pt-10 pl-2 pr-2">
            <TailwindBarChart data={data} />
          </div>

          <div className="pt-7 pl-8 pr-8">
            <LatestExpense />
          </div>

          <div className="pl-8 pr-8 text-center flex justify-center">
            <div
              className="bg-[#4CAF50] w-14 min-h-14 max-h-14 rounded-full flex justify-center items-center shadow-lg hover:bg-green-700 cursor-pointer transition-all duration-300"
              onClick={() => setAddOpen(true)}
            >
              <PlusCircleIcon size={32} color="#ffffff" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainDash;
