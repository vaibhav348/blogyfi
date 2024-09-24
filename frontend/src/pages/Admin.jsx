import React, { useEffect } from 'react'
import BlogContext from '../context/BlogContext'
import { useContext } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import axios from 'axios'
import { CgPassword } from 'react-icons/cg'
import toast from 'react-hot-toast'
import { checkAuth } from '../helpers/checkAuth'
import CreateBlog from '../components/CreateBlog'
import { Link } from 'react-router-dom'
import Navber from '../components/Navber'
const Admin = () => {

  const { isAuth, setIsAuth } = useContext(BlogContext)

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("https://blogyfi.onrender.com/api/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      const data = res.data; // Directly assign without awaiting
  
      if (data.success) { // Assuming your API returns a success flag
        toast.success(data.message);
        setIsAuth(true);
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Use a different username or password");
    }
  };
  

  useEffect(() => {
    checkAuth()
      .then((data) => {
        setIsAuth(data);
      })
      .catch((error) => {
        console.log(error.message);
        setIsAuth(false); // Optionally set to false if checkAuth fails
      });
  }, []); // Empty array to run only once on mount
  


  return (
    <>
      {
        !isAuth ? (

          < div className='h-screen m-0 flex justify-center items-center  bg-gradient-to-r from-teal-300 to-purple-300  '>
            <Navber/>
            <form onSubmit={handleLogin} className='grid grid-cols-1  mt-40 mb-14 bg-zinc-900 w-[80vw] md:w-[40vw] p-3 rounded-lg gap-3 pb-10'>
              <div className=' p-6 flex flex-col justify-center items-center'>
                <h2 className='text-white font-semibold text-base '>Welcome back to</h2>
                <h3 className='text-white font-extrabold text-5xl '>Blogify</h3>
              </div>




              <input type="text"
                name='username'
                id='username'
                placeholder='Username'
                required
                className='rounded-xl m-auto w-[80%] px-3 py-1 text-lg outline-none bg-zinc-900  border border-zinc-600 text-zinc-400' />
              <input type="password"
                name='password'
                id='password'
                placeholder='Password'
                required
                className='rounded-xl m-auto w-[80%] px-3 py-1 text-lg outline-none bg-zinc-900  border border-zinc-600 text-zinc-400' />


              <button type='submit' className=' w-[80%] m-auto  bg-gradient-to-r  from-teal-300 to-purple-300 hover:from-pink-300 hover:to-orange-300 
               rounded-2xl px-3 py-1 text-blue-900 font-semibold  transition-all duration-300 ease-in-out'>Login</button>
              <div className='w-[80%] m-auto text-base'>

              <p className='text-zinc-200'>  Don't have an account? </p>
              <Link to={"/Register"} className='text-blue-500'>
                Register</Link>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <AdminNavbar />
            <CreateBlog />
          </div>
        )
      }



    </>
  )
}

export default Admin