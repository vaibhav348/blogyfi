import React, { useContext } from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa"
import navlogo from "../assets/logo.png"
import BlogContext from '../context/BlogContext';
import { Link } from 'react-router-dom';
const Navber = () => {


 const [keyword, setKeyword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="rounded-b-2xl shadow-md bg-white/30 backdrop-blur-lg border-gray-200 dark:bg-gray-900/30 dark:backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          
        <style jsx>{`
        .smooth-hover {
          transition-property: all;
          transition-duration: 200ms; /* Quick return to previous state */
          transition-timing-function: ease-in-out;
        }
        .smooth-hover:hover {
          transition-duration: 5000ms; /* Slower and smoother hover effect */
        }
      `}</style>

      <img 
        src={navlogo} 
        alt="Blogyfi" 
        className='w-36 h-11 object-cover rounded-2xl opacity-90 smooth-hover hover:rounded-full hover:opacity-95 hover:filter hover:hue-rotate-95 hover:saturate-150' 
      />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogify</span> */}
         
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${isMenuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            
           
            
            <li>
              <a href="/admin" className="block py-2 flex items-center justify-center h-full text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-900 md:p-0 dark:text-white md:dark:hover:text-purple-700  
              
              dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Write</a>
            </li>
            <li>
            <form className="mx-auto max-w-xl py-1 px-2 pl-4 rounded-full bg-blue-100 border flex focus-within:border-gray-800">
  <input 
    type="text" 
    onChange={(e) => setKeyword(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // prevent form from submitting
        window.location.href = `/blogs?blogs=${keyword}`; // trigger search action
      }
    }}
    placeholder="Search blog..." 
    className="bg-transparent text-base w-full focus:outline-none font-medium border-0 focus:ring-0 px-0 py-0" 
    name="topic"
  />
  <Link to={`/blogs?blogs=${keyword}`} className="w-full m-0 md:w-auto">
  <a className="flex items-center justify-center min-w-[100px]  rounded-full font-bold text-base bg-gradient-to-r from-teal-500 to-purple-500 hover:from-pink-500 hover:to-orange-500 text-white py-1.5 h-[38px] transition duration-150">
  Search
</a>

  </Link>
</form>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

 
}

export default Navber