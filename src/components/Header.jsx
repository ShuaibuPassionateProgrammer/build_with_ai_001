import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI File Analyzer</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;