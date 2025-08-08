export default function Sidebar({ categories, active, onSelect }) {
  return (
    <div className="w-48 bg-gray-100 h-full p-3 border-r">
      <h2 className="font-bold mb-2">Categories</h2>
      {categories.map(cat => (
        <button
          key={cat}
          className={`block w-full text-left p-2 rounded hover:bg-gray-200 ${
            active === cat ? "bg-gray-300" : ""
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
