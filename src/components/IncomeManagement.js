import IncomeForm from "./IncomeForm";
import IncomeCard from "./IncomeCard";
import { useExpense } from "../context/expense";

const IncomeManagement = () => {
  const { incomeData } = useExpense();
  return (
    <div>
      <IncomeForm />
      <IncomeCard incomeData={incomeData} />
    </div>
  );
};

export default IncomeManagement;
