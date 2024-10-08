import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { useExpense } from "../context/expense";
import ExpenseCard from "./ExpenseCard";

const ExpenseManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { expenseData } = useExpense();

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedExpense(null);
  };
  return (
    <div>
      <ExpenseForm
        selectedExpense={selectedExpense}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <h1 className="text-center text-2xl font-bold mt-4">All Expenses</h1>
      <div className="flex justify-center flex-wrap gap-3">
        {expenseData.map((expense) => {
          return (
            <ExpenseCard
              expense={expense}
              key={expense._id}
              onEdit={() => handleEditExpense(expense)}
              onCancel={() => handleCancelEdit()}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseManagement;
