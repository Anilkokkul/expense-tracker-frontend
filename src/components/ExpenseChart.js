import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const groupExpensesByCategoryAndMonth = (expenses) => {
  const groupedData = {};

  expenses.forEach((expense) => {
    const month = expense.month;
    const category = expense.category;

    if (!groupedData[month]) {
      groupedData[month] = {};
    }

    if (!groupedData[month][category]) {
      groupedData[month][category] = 0;
    }

    groupedData[month][category] += expense.amount;
  });

  return groupedData;
};

const prepareChartData = (groupedData) => {
  const labels = Object.keys(groupedData);
  const categories = new Set();

  Object.values(groupedData).forEach((monthData) => {
    Object.keys(monthData).forEach((category) => {
      categories.add(category);
    });
  });

  const datasets = Array.from(categories).map((category) => {
    const data = labels.map((month) => groupedData[month][category] || 0);
    return {
      label: category,
      data,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    };
  });

  return {
    labels,
    datasets,
  };
};

const ExpenseChart = ({ expenses }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const groupedData = groupExpensesByCategoryAndMonth(expenses);
    const data = prepareChartData(groupedData);
    setChartData(data);
  }, [expenses]);

  return (
    <div>
      <h2 className="text-xl font-semibold mt-10">
        Monthly Expenses by Category
      </h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Expenses Overview",
            },
          },
        }}
      />
    </div>
  );
};

export default ExpenseChart;
