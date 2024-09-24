import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../helpers/getBlogs';

const MainSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className='bg-gradient-to-r from-pink-200 to-orange-200 pb-6'>

<section className="relative py-32 md:py-40 bg-gradient-to-r from-teal-300 to-purple-300 text-gray-900 overflow-hidden rounded-b-3xl shadow-lg">
{/* Animated Background Elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 animate-pulse delay-75"></div>

      <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between gap-5 px-10">
        <div className="w-full flex flex-col gap-3 md:w-1/2">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
  {blogs[0]?.title}
</h2>

<p className="text-lg md:text-xl bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent font-sans lg:w-[50vw] font-normal">
  Uncover the details in our newest post – click here to dive in!
</p>
<hr />
<div className="flex gap-2">
  {blogs[0]?.tags?.map((tag, i) => (
    <span
      key={i}
      className="px-2 py-1 text-sm md:text-sm bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent rounded-md capitalize font-semibold"
    >
      {tag}
    </span>
  ))}
</div>

          <Link
            to={`/blog/${blogs[0]?._id}`}
            className="bg-gradient-to-r from-teal-500 to-purple-300 hover:from-pink-300 hover:to-orange-300 px-6 py-2 text-xs md:text-sm rounded-full font-semibold mr-auto flex justify-start items-start mt-3"
            >
            Read more
          </Link>
        </div>

        <div>
          <img
            src={blogs[0]?.thumbnail}
            alt="thumbnail"
            className="md:w-[40vw] rounded-3xl"
            />
        </div>
      </div>
    </section>
            </section>
  );
};

export default MainSection;
