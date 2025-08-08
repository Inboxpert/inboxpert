import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = ["Shopping", "Finance", "Work", "Social"];

  return (
    <div className="flex h-screen">
      <Sidebar
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold">
          {activeCategory || "All Emails"}
        </h1>
        {/* Email list will go here */}
      </div>
    </div>
  );
}
