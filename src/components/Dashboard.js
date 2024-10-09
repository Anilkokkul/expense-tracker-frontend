import React, { useEffect, useState } from "react";
import { useExpense } from "../context/expense";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ExpenseChart from "./ExpenseChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { incomeData, expenseData, getIncomes, getExpenses } = useExpense();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
  });

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  const [monthlyData, setMonthlyData] = useState({
    incomesByMonth: [],
    expensesByMonth: [],
  });
  const groupDataByMonth = (incomes, expenses) => {
    const incomesByMonth = Array(12).fill(0);
    const expensesByMonth = Array(12).fill(0);

    incomes.forEach((income) => {
      const monthIndex = parseInt(income.month.split("-")[1], 10) - 1;
      incomesByMonth[monthIndex] += income.totalIncome;
    });

    expenses.forEach((expense) => {
      const monthIndex = parseInt(expense.month.split("-")[1], 10) - 1;
      expensesByMonth[monthIndex] += expense.amount;
    });

    return { incomesByMonth, expensesByMonth };
  };

  const calculateTotals = (incomes, expenses) => {
    const totalIncome = incomes.reduce(
      (acc, income) => acc + income.totalIncome,
      0
    );
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const totalSavings = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, totalSavings };
  };

  useEffect(() => {
    const yearFilteredIncomes = incomeData.filter(
      (income) => parseInt(income.month.split("-")[0]) === selectedYear
    );
    const yearFilteredExpenses = expenseData.filter(
      (expense) => parseInt(expense.month.split("-")[0]) === selectedYear
    );

    const { totalIncome, totalExpenses, totalSavings } = calculateTotals(
      yearFilteredIncomes,
      yearFilteredExpenses
    );
    setTotals({ totalIncome, totalExpenses, totalSavings });
    const { incomesByMonth, expensesByMonth } = groupDataByMonth(
      yearFilteredIncomes,
      yearFilteredExpenses
    );
    setMonthlyData({ incomesByMonth, expensesByMonth });
  }, [selectedYear, incomeData, expenseData]);
  const uniqueYears = Array.from(
    new Set([
      ...incomeData.map((income) => parseInt(income.month.split("-")[0])),
      ...expenseData.map((expense) => parseInt(expense.month.split("-")[0])),
    ])
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getPieChartDataForMonth = (income, expense) => {
    return {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: `Income vs Expenses`,
          data: [income, expense],
          backgroundColor: ["#4CAF50", "#FF6384"],
          hoverBackgroundColor: ["#66BB6A", "#FF6B8A"],
        },
      ],
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-5 mt-5 bg-white shadow-lg  rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard</h2>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="year">
          Select Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-28 p-2 border rounded-lg focus:outline-none focus:border-blue-400"
        >
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-blue-100">
          <h3 className="text-lg font-medium text-blue-800">Total Income</h3>
          <p className="text-xl font-bold text-blue-600">
            ₹ {totals.totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-red-100">
          <h3 className="text-lg font-medium text-red-800">Total Expenses</h3>
          <p className="text-xl font-bold text-red-600">
            ₹ {totals.totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-green-100">
          <h3 className="text-lg font-medium text-green-800">Total Savings</h3>
          <p className="text-xl font-bold text-green-600">
            ₹ {totals.totalSavings.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
        {months.map((month, index) => {
          const income = monthlyData.incomesByMonth[index] || 0;
          const expense = monthlyData.expensesByMonth[index] || 0;
          return (
            <div
              key={index}
              className="mb-2 border p-2 rounded-md shadow-md min-h-40"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {month}
              </h3>
              {income === 0 && expense === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  No data available
                </p>
              ) : (
                <Pie
                  data={getPieChartDataForMonth(income, expense)}
                  options={{
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            const label = tooltipItem.label;
                            const value = tooltipItem.raw;
                            const total = income + expense;
                            const percentage = total
                              ? ((value / total) * 100).toFixed(2)
                              : 0;
                            return `${label}: ₹ ${value} (${percentage}%)`;
                          },
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <ExpenseChart expenses={expenseData} />
    </div>
  );
};

export default Dashboard;
