import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../App";

const expenseContext = createContext(null);

export const useExpense = () => useContext(expenseContext);

const ExpenseProvider = ({ children }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getIncomes();
    getExpenses();
    getCategories();
  }, []);
  const getIncomes = async () => {
    try {
      const res = await instance.get("/income");
      setIncomeData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addIncome = async (amount, month) => {
    try {
      const res = await instance.post("/income/add", { amount, month });
      getIncomes();
      return res.data.message;
    } catch (error) {
      console.error(error);
      return error.response.data.message;
    }
  };

  const lockIncome = async (month) => {
    try {
      const res = await instance.patch("/income/lock", { month });
      getIncomes();
      return res.data.message;
    } catch (error) {
      console.error(error);
      return error.response.data.message;
    }
  };

  const getExpenses = async () => {
    try {
      const res = await instance.get("/expense");
      setExpenseData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = async (title, amount, category, date) => {
    try {
      const res = await instance.post("/expense/add", {
        title,
        amount,
        category,
        date,
      });
      getIncomes();
      getExpenses();
      return res.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const editExpense = async (_id, title, amount, category, date) => {
    try {
      const res = await instance.put(`/expense/${_id}`, {
        title,
        amount,
        category,
        date,
      });
      getIncomes();
      getExpenses();
      return res.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const getCategories = async () => {
    try {
      const res = await instance.get("/category");
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async (name) => {
    try {
      const res = await instance.post("/add-category", {
        name,
      });
      getCategories();
      return res.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  };
  return (
    <expenseContext.Provider
      value={{
        incomeData,
        addIncome,
        lockIncome,
        addExpense,
        expenseData,
        categories,
        addCategory,
        editExpense,
        getIncomes,
        getExpenses,
      }}
    >
      {children}
    </expenseContext.Provider>
  );
};

export default ExpenseProvider;
