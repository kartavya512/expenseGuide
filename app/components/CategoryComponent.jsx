import { Utensils, ShoppingBag, TrainFront, House, HandCoins, Drama, Fuel, Plane, Hospital, GraduationCap, ShoppingBasket, Gift, Dumbbell, Bean, PiggyBank, ShieldQuestion, Banknote, Wallet, Landmark } from 'lucide-react';

function CategoryComponent({ isExpense, setCategoryArg, handleCategoryClick }) {
  // Define category data for expenses
  const expenseCategories = [
    { id: 1, label: "Food", icon: Utensils, color: "#ff7300" },
    { id: 2, label: "Shopping", icon: ShoppingBag, color: "#b50cf2" },
    { id: 3, label: "Transport", icon: TrainFront, color: "#f2d00c" },
    { id: 4, label: "Rent/Home", icon: House, color: "#857a41" },
    { id: 5, label: "EMI", icon: HandCoins, color: "#1ed9c3" },
    { id: 6, label: "Entertainment", icon: Drama, color: "#ff7300" },
    { id: 7, label: "Fuel", icon: Fuel, color: "#1e82d9" },
    { id: 8, label: "Travel", icon: Plane, color: "#7c1ed9" },
    { id: 9, label: "Healthcare", icon: Hospital, color: "#cc4797" },
    { id: 10, label: "Education", icon: GraduationCap, color: "#0d55fc" },
    { id: 11, label: "Groceries", icon: ShoppingBasket, color: "#e8602e" },
    { id: 12, label: "Gifts", icon: Gift, color: "#03ff89" },
    { id: 13, label: "Sports", icon: Dumbbell, color: "#53fcc7" },
    { id: 14, label: "Beauty", icon: Bean, color: "#3d0487" },
    { id: 15, label: "Investments", icon: PiggyBank, color: "#05f511" },
    { id: 16, label: "Others", icon: ShieldQuestion, color: "#555259" },
  ];

  // Define category data for income
  const incomeCategories = [
    { id: 1, label: "Salary", icon: Banknote, color: "#05b011" },
    { id: 2, label: "Extra Income", icon: Wallet, color: "#00ff11" },
    { id: 3, label: "Gifts", icon: Gift, color: "#03ff89" },
    { id: 4, label: "Loan", icon: Landmark, color: "#fc0394" },
    { id: 5, label: "Others", icon: ShieldQuestion, color: "#555259" },
  ];

  const categories = isExpense ? expenseCategories : incomeCategories;

  return (
    <div className="rounded-lg">
      <div className="max-h-44 overflow-y-auto">
        <div className="grid grid-cols-3 gap-5">
          {categories.map((category) => (
            <div key={category.id} onClick={() => setCategoryArg(category.id)}>
              <div
                className="flex flex-col items-center"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="bg-black rounded-full w-12 h-12">
                  <div className="flex justify-center pt-3">
                    <category.icon color={category.color} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-sm p-1 pt-2">{category.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryComponent;
