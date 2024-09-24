import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navber from '../components/Navber';
import BlogContext from '../context/BlogContext';
import noPostsImage from "../assets/nopost.png";

import { getBlogsByKeyword } from '../helpers/getBlogsByKeyword';
import BlogCard from '../components/BlogCard';

const MyBlogs = () => {
    const { blogByKeyword, setBlogByKeyword } = useContext(BlogContext);
    const [error, setError] = useState(null);

    // Extract query parameter using useLocation and URLSearchParams
    const location = useLocation();
    const owner = new URLSearchParams(location.search).get('myblog'); // Extract 'blogs' query parameter

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const fetchedBlogs = await getBlogsByKeyword(owner);
                setBlogByKeyword(fetchedBlogs);
            } catch (err) {
                setError('Error fetching blogs1.');
            }
        };

        if (owner) {
            console.log("owner hai", owner);

            fetchBlogs();
        }
    }, [owner, setBlogByKeyword]);

    return (
        <>
            <Navber />
            <div className="bg-gradient-to-r from-teal-300 to-purple-300  p-2 pt-24  md:p-24">
                <h1 className='text-gray-800 uppercase text-base flex items-center justify-center p-4  mx-2 mb-4  rounded-xl shadow-md bg-white backdrop-blur-lg border-gray-200 dark:bg-gray-300/20 dark:backdrop-blur-lg'>Your Blogs  <span className='text-black font-bold pl-1'>
                    {owner}
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
                        <p className="text-xl font-semibold">No Blog found</p>
                      </div>




                    ) : (
                        blogByKeyword.map((blog) =>
                            <div className='m-2 '>

                                <BlogCard key={blog._id} {...blog} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default MyBlogs;
