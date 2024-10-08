import React, { useState } from "react";
import { useExpense } from "../context/expense";

const IncomeForm = () => {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { addIncome } = useExpense();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const responseMessage = await addIncome(amount, month);
      setMessage(responseMessage);
      setAmount("");
      setMonth("");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-2 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Add Monthly Income
      </h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="month"
          >
            Month
          </label>
          <input
            type="month"
            id="month"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-400"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="amount"
          >
            Income Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter income amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
