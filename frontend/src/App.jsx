import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Blog from "./pages/Blog"
import Register from "./pages/Register.jsx"

import BlogContext from "./context/BlogContext";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Blogs from "./pages/Blogs.jsx"
import MyBlogs from "./pages/MyBlogs.jsx"

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [blogs, setBlogs] = useState([])
  const [userData, setUserData] = useState(null); // State to store user data
  const [blogByKeyword, setBlogByKeyword] = useState([])
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState("")
  const [currentUserId, setCurrentUserId] = useState("")
const [profileImage,  setProfileImage] = useState(null)
  return (
    <BlogContext.Provider value={{
      isAuth,
      userData,
      setUserData,
      setIsAuth,
      profileImage, 
      setProfileImage,
      blogs,
      setBlogs,
      blogByKeyword,
     setBlogByKeyword,

      userAuthenticated
      , setUserAuthenticated,
      userName, setUserName,
      userImage, setUserImage,
      currentUserId, setCurrentUserId
    }}>
      <BrowserRouter>

        <Toaster />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/myblogs" element={<MyBlogs/>} />

          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/Register" element={<Register />} />

        </Routes>


      </BrowserRouter>
    </BlogContext.Provider>
  )
}