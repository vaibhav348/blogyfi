import React, { useContext, useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'
import { getBlogs } from '../helpers/getBlogs'
import BlogContext from '../context/BlogContext'
import { convertDate } from '../helpers/convertDate'

const BlogSection = () => {

    const { blogs, setBlogs } = useContext(BlogContext);

    useEffect(() => {
        getBlogs()
            .then((data) => setBlogs(data))
            .catch((err) => console.log(err))
        console.log(blogs);

    }, [])




    return (<section className='bg-gradient-to-r from-pink-200 to-orange-200 py-6'>
        <h2 className='pb-6 w-full flex items-center justify-center m-auto font-normel text-base'>
            Insightful Writing, Meaningful Reads
        </h2>
        <div className='md:px-10  px-4 md:px-auto w-fit flex flex-col md:flex-row gap-3 lg:gap-8 justify-center '>

            {/* secand blog */}
            <Link to={`/blog/${blogs[1]?._id}`} className='  md:w-[40%] h-fit py-3 mx-10 flex mb-4 flex-col gap-3 w-fit rounded-2xl shadow-md mx-auto  bg-white   '>

                <h2 className='text-2xl font-bold mx-5 '>{

                    blogs[1]?.title.length > 40 ? blogs[1]?.title.slice(0, 40) + "..." : blogs[1]?.title
                }</h2>
                <img src={blogs[1]?.thumbnail} alt="blogs thumbnails" className='w-[95%]  rounded-2xl shadow-1xl m-auto ' />
                <div className='flex gap-2 mx-5 py-1'>

                    {
                        blogs[1]?.tags.map((tag, i) => (
                            <span kay={i} className='px-2 py-1 text-gray-900 text-xs md:text-sm  bg-gray-200   
                            rounded-md font-semibold shadow-md capitalize'>{tag}</span>
                        ))
                    }
                </div>
                <hr className='mx-5' />
                <div className='mx-5 flex justify-start items-center gap-2'>

                    <img src={blogs?.[1]?.profileImage ? blogs[1].profileImage : 'https://img.icons8.com/?size=100&id=x2tr2g6eXjMc&format=png&color=000000'}
                        alt={blogs?.[1]?.author ? `${blogs[1].author}'s profile` : 'Profile'}
                        className="w-[40px] h-[40px] rounded-full border-2 border-gray-200 shadow-md object-cover"
                    />




                    <div>
                        <h2 className='text-sm font-bold uppercase text-gray-700 font-sans'>
                            {blogs[1]?.author}
                        </h2>
                        <p className='text-xs font-bold uppercase text-gray-700 font-sans'>
                            {convertDate(blogs[1]?.createdAt)}
                        </p>
                    </div>

                </div>
            </Link>

            {/* rest all blogs hear */}
            <div className='grid grid-cols-1 gap-3 md:h-[100vh] md:overflow-y-scroll md:px-3 md:pb-2 '>
                {
                    blogs?.slice(2).map((blog) =>
                        <BlogCard key={blog._id} {...blog} />
                    )
                }

            </div>

        </div>
    </section>
    )
}

export default BlogSection