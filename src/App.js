import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://expense-tracker-server-zvgn.onrender.com",
  withCredentials: true,
});

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
