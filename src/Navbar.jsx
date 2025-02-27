import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider as provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./assets/cn_logo.png";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 py-2.5">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img src={Logo} className="h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Voting App</span>
        </Link>

        {/* User Profile & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                <img className="w-10 h-10 rounded-full object-cover" src={user.photoURL} alt="User Profile" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg dark:bg-gray-800 border dark:border-gray-700 transform transition-all">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleSignOut} 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={handleSignIn} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in with Google
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto transition-all duration-200 ease-in-out`}>
          <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:items-center md:space-x-1">
            <NavLink to="/" active>Login</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// NavLink component for consistent styling
const NavLink = ({ to, children, active }) => {
  const baseClasses = "px-3 py-2 rounded-lg text-sm font-medium transition-colors";
  const activeClasses = "text-blue-600 dark:text-blue-500";
  const inactiveClasses = "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
  
  return (
    <li>
      <Link 
        to={to} 
        className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
      >
        {children}
      </Link>
    </li>
  );
};