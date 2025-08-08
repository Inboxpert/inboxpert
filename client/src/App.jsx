import { useEffect, useState } from "react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get user's categories from background script
    chrome.runtime.sendMessage({ action: 'getCategories' }, (response) => {
      if (response.success) {
        setCategories(response.categories);
      } else {
        console.error('Failed to load categories:', response.error);
      }
    });
  }, []);

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    // Send message to content script
    window.parent.postMessage({
      type: 'CATEGORY_SELECTED',
      category
    }, '*');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Inboxpert</h1>
      <div className="space-y-2">
        {categories.map(cat => (
          <button
            key={cat}
            className={`w-full text-left p-2 rounded hover:bg-blue-50 ${
              activeCategory === cat ? "bg-blue-100 border-l-4 border-blue-500" : ""
            }`}
            onClick={() => handleSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}