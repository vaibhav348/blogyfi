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
      <div className="h-full min-h-screen bg-gradient-to-r from-teal-300 to-purple-300  p-2 pt-24  md:p-24">
      <h1 className="text-gray-800 uppercase text-lg flex items-center justify-center p-4 px-10  mb-4 rounded-2xl bg-white  w-fit m-auto">
  Result for <span className="text-black font-bold pl-1">{keyword}</span>
</h1>

        <div>
        
          {error ? (
           <div className="no-posts-container flex flex-col items-center justify-center  text-center">
           <img 
             src={noPostsImage} 
             alt="No posts found" 
             className="w-auto h-60 rounded-md object-cover mb-4"
           />
           <p className="text-xl font-semibold">No Blog found</p>
         </div>
          ) : (
            blogByKeyword.map((blog) => 
              <div className='m-4 '>
                
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
