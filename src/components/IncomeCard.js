import React from "react";
import { useExpense } from "../context/expense";

const IncomeCard = ({ incomeData }) => {
  const { lockIncome } = useExpense();
  if (!incomeData || incomeData.length === 0) {
    return (
      <p className="text-center text-gray-600">No income data available.</p>
    );
  }

  const handleLockIncome = (month) => {
    lockIncome(month)
      .then((data) => {
        alert(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Monthly Income Overview
      </h2>
      <div className="sm:flex gap-2 flex-wrap justify-center">
        {incomeData.map((income, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-700">
              <strong>Month:</strong> {income.month}
            </p>
            <p className="text-gray-700">
              <strong>Total Income:</strong> ₹{income.totalIncome}
            </p>
            <p className="text-gray-700">
              <strong>Remaining Income:</strong> ₹{income.remainingIncome}
            </p>
            <p
              className={`text-gray-700 ${
                income.isLocked ? "text-red-600" : "text-green-600"
              }`}
            >
              <strong>Status:</strong> {income.isLocked ? "Locked" : "Unlocked"}
              {!income.isLocked && (
                <button
                  className=" px-2 py-1 bg-blue-500 text-white text-[10px] ml-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => handleLockIncome(income.month)}
                >
                  Lock Income
                </button>
              )}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Last Updated:</strong>{" "}
              {new Date(income.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeCard;
