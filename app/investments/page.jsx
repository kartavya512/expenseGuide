"use client";
import React, { useEffect, useState } from "react";
import MenuComp from "../components/MenuComp";
import { Menu, X, Trash2 } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import moment from "moment";
import { db } from "../firebase";
import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  collection,
  where,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TailwindBarChart({ data }) {
  return (
    <div className="bg-black rounded-lg shadow dark:bg-black mt-6">
      <ResponsiveContainer width="90%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 1, left: 2, bottom: 0 }}>
          <XAxis dataKey="label" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Bar dataKey="value" fill="rgba(37, 99, 235, 0.6)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Investments() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expenseData, setExpenseData] = useState(null); // Start as null to distinguish between loading and empty states
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoInvestmentsMessage, setShowNoInvestmentsMessage] = useState(false);

  const { user } = UserAuth();
  const userUid = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!userUid) {
        setIsLoading(false); // Stop loading if no user
        return;
      }

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

          const transformedData = expenseArr.reduce((acc, curr) => {
            var month = moment(curr.date.toDate()).format("MMMM YYYY");
            month=month.slice(0,3)
            console.log(month,"montyh")
            const amount = parseFloat(curr.amount) || 0;
            const category = curr.category;
            const note = curr.note;

            if (category === "Investments") {
              const existingMonth = acc.find((item) => item.month === month);
              if (existingMonth) {
                existingMonth.amount += amount;
                existingMonth.investments.push(curr);
              } else {
                acc.push({ month, amount, note, investments: [curr] });
              }
            }
            return acc;
          }, []);

          setExpenseData(transformedData);
          setIsLoading(false);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userUid]);

  useEffect(() => {
    if (expenseData) {
      const amount = expenseData.reduce(
        (total, expense) => total + (expense.amount || 0),
        0
      );
      setTotalAmount(amount);
    }
  }, [expenseData]);

  // Timer logic for showing the "No Investments" message
  useEffect(() => {
    let timer;
    if (!isLoading && expenseData && expenseData.length === 0) {
      timer = setTimeout(() => {
        setShowNoInvestmentsMessage(true);
      }, 3000); // Show message after 3 seconds
    } else {
      setShowNoInvestmentsMessage(false); // Reset if data is present
    }

    return () => clearTimeout(timer); // Clean up timer on unmount or data change
  }, [isLoading, expenseData]);

  const deleteItem = async (id) => {
    try {
      toast.success("Expense deleted successfully!");
      await deleteDoc(doc(db, "ExpenseDetails", id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Prepare data for the bar chart
  const chartData =
    expenseData?.map((item) => ({
      label: item.month,
      value: item.amount,
    })) || [];

  return (
    <div className="pt-8 pl-8 pr-8">
      <ToastContainer />
      {menuOpen ? (
        <div className="bg-gray-900 h-screen absolute right-0 top-0 w-10/12 z-50">
          <div>
            <X
              color="#ffffff"
              size={36}
              strokeWidth={1.25}
              className="absolute right-6 top-8"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <MenuComp />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div>
            <div className="text-lg opacity-70">Welcome Back</div>
            <div className="text-xl mt-[0.5px]">Kartavya</div>
          </div>
          <div className="pt-3">
            <Menu size={32} color="#ffffff" onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size={50} />
        </div>
      ) : expenseData && expenseData.length > 0 ? (
        <>
          <div className="pt-10 flex flex-col justify-center items-center">
            <div className="text-lg">Your Total Investments</div>
            <div className="text-4xl font-bold p-2 text-[#00ff4c]">
              ₹{totalAmount}
            </div>
          </div>

          <div className="pt-10">
          <TailwindBarChart data={chartData} />
            <h2 className="text-2xl font-semibold">Investments by Month</h2>
            {expenseData.map((monthData) => (
              <div key={monthData.month} className="mt-6">
                <h3 className="text-xl font-bold">{monthData.month}</h3>
                <ul className="mt-2">
                  {monthData.investments.map((investment) => (
                    <li
                      key={investment.id}
                      className="flex justify-between p-2 border-b"
                    >
                      <div>
                        <span className="font-medium">{investment.note}</span>
                      </div>
                      <div>₹{investment.amount}</div>
                      <Trash2
                        strokeWidth={1.75}
                        onClick={() => deleteItem(investment.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          
        </>
      ) : (
        showNoInvestmentsMessage && (
          <p className="pt-10 text-center text-2xl text-red-400">
            Please add Investments
          </p>
        )
      )}
    </div>
  );
}
