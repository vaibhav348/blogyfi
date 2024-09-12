import React, { useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BlogContext from '../context/BlogContext';
import { uploadImage } from '../helpers/uploadImage';
import Navber from '../components/Navber';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { profileImage, setProfileImage } = useContext(BlogContext)
  const navigate = useNavigate();
  
  

  const handleThumbnailChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file.size > 3000000) {
      alert("file size shude be less then 1 mb")
    } else {
      console.log(file);
      setProfileImage(file);
    }
  }, []

  )


  const handleRegister = async (e) => {
    e.preventDefault();

    const onUplodeProgress = (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      setProgress(percentCompleted)
    }


    try {
      const uploadedImage = await uploadImage(profileImage, onUplodeProgress)
      if (!uploadedImage) {
        return toast.error("Error uploding image")
      }

      console.log(profileImage, username, email, password);
      const res = await axios.post("http://localhost:3100/api/signup", {
        profileImage: uploadedImage.url,
        username,
        email,
        password
      });

      const data = await res.data;
      toast.success(data.message);
      setProfileImage(null)
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect to the login page
      navigate('/Admin');
    } catch (error) {
      console.error(error.message);
      toast.error(`Registration failed. use diffrent Username or Password!!!`);
    }
  };

  return (
    <div className=' h-screen md:h-full pt-28 pb-8 bg-gradient-to-r from-teal-300 to-purple-300'>
      <Navber />
      <div className='  h-[80%] flex justify-center items-center'>
        <form onSubmit={handleRegister} className='grid grid-cols-1 bg-zinc-900 w-[80vw] md:w-[40vw] p-3 rounded-lg gap-3 pb-10'>
          <div className='p-6 flex flex-col justify-center items-center'>
            <h2 className='text-white font-semibold text-base'>Welcome to</h2>
            <h3 className='text-white font-extrabold text-5xl'>Blogify</h3>
          </div>

          <div className='flex w-[80%] m-auto'>
            <label
              htmlFor="profileImage"
              className=" text-lg  font-semibold text-zinc-400 m-auto px-4"
            >
              Profile
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              required
              
              tabIndex={1}
              onChange={handleThumbnailChange}
              className="rounded-xl m-auto w-[80%] px-3 py-1 text-lg outline-none bg-gray-100  border border-zinc-600 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />


          </div>

          <input
            type="text"
            name='username'
            id='username'
            placeholder='Username '
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='rounded-xl m-auto w-[80%] px-3 py-1 text-lg outline-none bg-zinc-900  border border-zinc-600 text-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
          />

          <input
            type="email"
            name='email'
            id='email'
            placeholder='Email '
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='rounded-xl m-auto w-[80%] px-3 py-1 text-lg outline-none bg-zinc-900  border border-zinc-600 text-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
          />

          <input
            type="password"
            name='password'
            id='password'
            placeholder='Password '
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='rounded-xl m-auto w-[80%] px-3 py-1 text-lg outline-none bg-zinc-900  border border-zinc-600 text-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
          />

          <button type='submit' className='w-[80%] m-auto bg-gradient-to-r from-teal-300 to-purple-300 hover:from-pink-300 hover:to-orange-300 rounded-2xl px-3 py-1 text-blue-900 font-semibold transition-all duration-300 ease-in-out'>
            Register
          </button>

          <div className='w-[80%] m-auto text-base'>
            <p className='text-zinc-200'>Already have an account...</p>
            <Link to={"/Admin"} className='text-blue-500'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Register;
