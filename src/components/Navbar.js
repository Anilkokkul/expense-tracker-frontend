import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    instance
      .get("/logout")
      .then((data) => {
        alert(data.data.message);
        navigate("/sign-in");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <nav className="bg-[#F4EDE5] px-4 py-6  shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-[#C43100]">
            Expense Tracker
          </div>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/income-management"
              className="text-gray-800 font-semibold hover:text-[#C43100]"
            >
              Monthly Income Management
            </Link>
          </li>
          <li>
            <Link
              to="/expense-management"
              className="text-gray-800 font-semibold hover:text-[#C43100]"
            >
              Expense Management
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-800 font-semibold hover:text-[#C43100]"
              to={"/dashboard"}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/expense-overview"
              className="text-gray-800 font-semibold hover:text-[#C43100]"
            >
              Expense Overview
            </Link>
          </li>
        </ul>

        <div className="flex gap-2 items-center">
          <div className="md:hidden">
            <button
              className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C43100]"
              onClick={() => {
                document
                  .getElementById("mobile-menu")
                  .classList.toggle("hidden");
              }}
            >
              <img src="/menu.png" alt="menu" className="w-10" />
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 inline-block mb-2 text-white font-bold px-3 py-1 rounded-md shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      <ul
        id="mobile-menu"
        className="flex flex-col space-y-4 mt-4 px-4 md:hidden"
      >
        <li>
          <Link
            to="/income-management"
            className="text-gray-800 font-semibold hover:text-[#C43100]"
          >
            Monthly Income Management
          </Link>
        </li>
        <li>
          <Link
            to="/expense-management"
            className="text-gray-800 font-semibold hover:text-[#C43100]"
          >
            Expense Management
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="text-gray-800 font-semibold hover:text-[#C43100]"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/expense-overview"
            className="text-gray-800 font-semibold hover:text-[#C43100]"
          >
            Expense Overview
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
