import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navber from '../components/Navber';
import BlogContext from '../context/BlogContext';
import { getBlogsByKeyword } from '../helpers/getBlogsByKeyword';
import BlogCard from '../components/BlogCard';
import noPostsImage from "../assets/nopost.png";
const Blogs = () => {
  const { blogByKeyword, setBlogByKeyword } = useContext(BlogContext);
  const [error, setError] = useState(null);

  // Extract query parameter using useLocation and URLSearchParams
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('blogs'); // Extract 'blogs' query parameter

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogsByKeyword(keyword);
        setBlogByKeyword(fetchedBlogs);
      } catch (err) {
        setError('Error fetching blogs1.');
      }
    };

    if (keyword) {
      console.log("keyword hai", keyword);
      
      fetchBlogs();
    }
  }, [keyword, setBlogByKeyword]);

  return (
    <>
      <Navber />
      <div className="m-24">
<h1 className='text-gray-800 uppercase text-base flex items-center justify-center p-4  mx-2 mb-4  rounded-2xl shadow-md bg-white/10 backdrop-blur-lg border-gray-200 dark:bg-gray-300/20 dark:backdrop-blur-lg'>Result for  <span className='text-black font-bold pl-1'>
     { keyword}
  </span>
   </h1>
        <div>
        
          {error ? (
           <div className="no-posts-container flex flex-col items-center justify-center  text-center">
           <img 
             src={noPostsImage} 
             alt="No posts found" 
             className="w-auto h-60 rounded-md object-cover mb-4"
           />
           <p className="text-xl font-semibold">No posts found</p>
         </div>
          ) : (
            blogByKeyword.map((blog) => 
              <div className='m-2 '>
                
              <BlogCard key={blog._id} {...blog}  />
              </div>
               )
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
