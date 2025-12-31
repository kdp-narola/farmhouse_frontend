const TabButton = ({ label, value, currentPage, onChange }) => {
  const isActive = currentPage === value;

  return (
    <button
      onClick={() => onChange(value)}
      className={`px-6 py-3 font-medium transition-all ${
        isActive
          ? "text-teal-600 border-b-2 border-teal-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
