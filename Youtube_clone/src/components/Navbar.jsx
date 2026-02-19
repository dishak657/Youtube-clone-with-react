import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[#0f0f0f] sticky top-0 z-50 border-b border-[#2d2d2d] h-16">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-1">
        <div className="p-2 hover:bg-[#272727] rounded-full cursor-pointer hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube Logo"
          className="h-6 object-contain ml-2"
        />
        <sup className="text-gray-400 text-[10px] ml-1">IN</sup>
      </Link>

      {/* Search Section */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-[600px] mx-4"
      >
        <div className="flex w-full items-center bg-[#121212] border border-[#303030] rounded-l-full overflow-hidden focus-within:border-[#1c62b9] ml-8">
          <div className="pl-4 pr-2 hidden sm:block">
            {/* Search looking glass icon inside could be added */}
          </div>
          <input
            className="bg-transparent border-none outline-none w-full text-white px-4 py-2 placeholder-gray-400"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-2 hover:bg-[#303030] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <div className="ml-4 bg-[#181818] p-2 rounded-full hover:bg-[#303030] cursor-pointer hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </div>
      </form>

      {/* Icons Section */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hover:bg-[#272727] p-2 rounded-full cursor-pointer hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
        <div className="hover:bg-[#272727] p-2 rounded-full cursor-pointer relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 rounded-full border-2 border-[#0f0f0f]">
            9+
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          S
        </div>
      </div>
    </nav>
  );
}