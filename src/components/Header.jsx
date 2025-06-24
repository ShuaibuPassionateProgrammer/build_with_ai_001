import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto py-5 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide">
          AI File Analyzer
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                className="hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;