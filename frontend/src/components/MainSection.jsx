import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs } from '../helpers/getBlogs';

const MainSection = () => {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err))
  }, [])


  return (
    <section className='pt-32 pb-5 gap-3  md:py-32  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-purple-500 to-90%  md:min-h-[80vh] flex flex-col-reverse 
    md:flex-row justify-between gep-5 px-10  '>

      <div className='w-[100%] flex flex-col gap-3 md:w-[50%] '>
        <h2 className='text-4x md:text-4xl font-bold text-white'>{
          blogs[0]?.title
        }</h2>

        <p className='text-lg md:text-xl text-white font-sans lg:w-[50vw]  font-thin'>Uncover the details in our newest post – click here to dive in!</p>
        <hr />
        <div className='flex gap-2'>
          {
            blogs[0]?.tags?.map((tag, i) => (
              <span
                kay={i}
                className=' 
                 px-2 py-1 text-xs md:text-sm text-black bg-gray-100/50 rounded-md capitalize font-semibold '>{tag}</span>
            ))
          }

        </div>
        <Link
          to={`/blog/${blogs[0]?._id}`}
          className='bg-gradient-to-r  from-teal-300 to-purple-300 hover:from-pink-300 hover:to-orange-300 
           px-6 py-2 text-xs md:text-sm  rounded-full font-semibold w-fit mt-3   '>
          Read more</Link>
      </div>

      <div>
        <img src={blogs[0]?.thumbnail} alt="thumbnail" className='md:w-[40vw] rounded-3xl ' />


      </div>
    </section>
  )
}

export default MainSection