import React, { useContext, useEffect, useState } from 'react';
import BlogContext from '../context/BlogContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { checkAuth } from '../helpers/checkAuth';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('createBlog'); // Default to 'Create blog'
  const { isAuth, setIsAuth } = useContext(BlogContext);
 const [owner, setOwner] = useState("");
  const { userData, setUserData } = useContext(BlogContext);
  useEffect(() => {
    // Retrieve the active button state from localStorage on load
    checkAuth()
    .then((data) => {
      if (data && data.user) {
        setUserData(data);
        setOwner(data.user.username);
        console.log("Owner set to:", data.user.username);
      } else {
        console.error('No user data found');
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });

    console.log(owner);
    
      
  //  setOwner(userData.user.username)
    const savedActiveButton = localStorage.getItem('activeButton');
    if (savedActiveButton) {
      setActiveButton(savedActiveButton);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3100/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setIsAuth(false);
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
    localStorage.setItem('activeButton', buttonName); // Save to localStorage
  };

  return (
    <nav className="rounded-b-2xl shadow-md bg-gradient-to-r from-teal-300/30 to-purple-300/30 backdrop-blur-lg border-gray-200 dark:bg-gray-900/30 dark:backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Blogify</span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-900 
          dark:text-gray-700 dark:hover:bg-gray-100 dark:focus:ring-gray-100"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${isMenuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-900/30 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-100/30 md:dark:bg-transparent dark:border-gray-700/30">
            <li>
              <Link to={`/myblogs?myblog=${owner}`}>
              <a
            onClick={() => handleButtonClick('allBlogs')}
            className={`flex items-center justify-center h-full block py-2 px-3 rounded ${
              activeButton === 'allBlogs'
              ? 'text-blue-800 font-semibold' // Active button: blue text
              : 'text-black hover:text-blue-800' // Inactive button: black text, blue on hover
            }`}
            >
                All blogs
              </a>
                </Link>
            </li>
            <li>
              <a
                href="/admin"
                onClick={() => handleButtonClick('createBlog')}
                className={`flex items-center justify-center h-full block py-2 px-3 rounded ${
                  activeButton === 'createBlog'
                    ? 'text-blue-800 font-semibold' // Active button: blue text
                    : 'text-black hover:text-blue-800' // Inactive button: black text, blue on hover
                }`}
              >
                Create blog
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                  handleButtonClick('logout');
                }}
                className={`flex items-center justify-center h-full block py-2 px-3 rounded ${
                  activeButton === 'logout'
                    ? 'text-blue-800 font-semibold' // Active button: blue text
                    : 'text-black hover:text-blue-800' // Inactive button: black text, blue on hover
                }`}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
