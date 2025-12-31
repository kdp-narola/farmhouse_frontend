import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const Search = ({ search, setSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, setSearch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex-1 relative">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
      <Input
        className="h-9 w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
