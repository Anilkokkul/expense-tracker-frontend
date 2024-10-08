import React, { useEffect, useState } from "react";
import { useExpense } from "../context/expense";

const ExpenseForm = ({ isEditing, selectedExpense, setIsEditing }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("grocery"); // Default to first enum option
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addExpense, categories, addCategory, editExpense } = useExpense();
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (isEditing && selectedExpense) {
      setTitle(selectedExpense.title);
      setAmount(selectedExpense.amount);
      setCategory(selectedExpense.category);
      setDate(selectedExpense.date.split("T")[0]);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [isEditing, selectedExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = isEditing
        ? await editExpense(selectedExpense._id, title, amount, category, date)
        : await addExpense(title, amount, category, date);
      setMessage(response);
      setTitle("");
      setAmount("");
      setIsEditing(false);
      setCategory("grocery");
      setDate("");
    } catch (err) {
      setError(err);
    }
  };
  const handleAddCategory = async () => {
    try {
      const response = await addCategory(newCategory);
      alert(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {" "}
        {isEditing ? "Edit Expense" : "Add Expense"}
      </h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Expense Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter expense title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter expense amount"
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          >
            {categories.map((category, i) => {
              return (
                <option key={i} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              );
            })}
          </select>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-2 text-blue-500 underline"
          >
            Add New Category
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  z-50 bg-black bg-opacity-50">
          <div className="w-96 mx-auto p-6 bg-white rounded-lg shadow-md mt-6 relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Add New Category
            </h2>
            <img
              src="/close.svg"
              alt="close"
              className="absolute top-4 right-4 cursor-pointer font-bold"
              onClick={() => setIsModalOpen(false)}
            />

            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="categoryName"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  placeholder="Enter category name"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;
