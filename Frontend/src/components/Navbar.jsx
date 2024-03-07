import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full">
        <div className="flex items-center mb-2 sm:mb-0">
          {/* <img src="logo.png" /> */}
          <a
            href="/"
            className="text-2xl font-bold no-underline text-green-800 hover:text-blue-dark"
          >
            Coddies
          </a>
        </div>
        <div>
          <a
            href="/"
            className="text-lg no-underline font-medium text-green-800 hover:text-green-dark ml-8"
          >
            Home
          </a>
          <a
            href="/login"
            className="text-lg no-underline font-medium text-green-800 hover:text-green-dark ml-8"
          >
            Sign in
          </a>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
