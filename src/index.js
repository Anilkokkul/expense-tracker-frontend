import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import IncomeManagement from "./components/IncomeManagement";
import ExpenseProvider from "./context/expense";
import ExpenseManagement from "./components/ExpenseManagement";
import ExpenseOverview from "./components/ExpenseOverview";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/income-management",
        element: <IncomeManagement />,
      },
      {
        path: "/expense-management",
        element: <ExpenseManagement />,
      },
      {
        path: "/expense-overview",
        element: <ExpenseOverview />,
      },
    ],
  },
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ExpenseProvider>
      <RouterProvider router={router} />
    </ExpenseProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
