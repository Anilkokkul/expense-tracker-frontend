import React from "react";

const ExpenseCard = ({ expense, onEdit, onCancel, isEditing }) => {
  const { title, amount, category, date, month, _id } = expense;

  return (
    <div className=" md:w-[300px] relative bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      <div className="p-4 ">
        {isEditing ? (
          <img
            src="/close.svg"
            alt="edit-cancel"
            onClick={onCancel}
            className="absolute top-4 right-4 cursor-pointer"
          />
        ) : (
          <img
            src="/edit.svg"
            alt="edit-expense"
            onClick={onEdit}
            className="absolute top-4 right-4 cursor-pointer"
          />
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Amount:</span> ₹ {amount}
        </p>

        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Category:</span>{" "}
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>

        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(date).toLocaleDateString()}
        </p>

        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Month:</span> {month}
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
