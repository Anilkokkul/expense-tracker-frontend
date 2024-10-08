import React, { useEffect, useState } from "react";
import { useExpense } from "../context/expense";

const ExpenseOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const { expenseData } = useExpense();
  const handleMonthChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const formattedMonth = selectedDate.toISOString().slice(0, 7);
    setSelectedMonth(formattedMonth);
  };
  useEffect(() => {
    if (selectedMonth) {
      const filteredExpenses = expenseData.filter(
        (expense) => expense.month === selectedMonth
      );
      setFilteredExpenses(filteredExpenses);
    }
  }, [selectedMonth, expenseData]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Monthly Expenses</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Month
        </label>
        <input
          type="month"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleMonthChange}
        />
      </div>

      {filteredExpenses.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id} className="border-t">
                <td className="border border-gray-300 px-4 py-2">
                  {expense.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{expense.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">
          No expenses found for the selected month.
        </p>
      )}
    </div>
  );
};

export default ExpenseOverview;
