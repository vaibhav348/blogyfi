import React from 'react'
import { Link } from 'react-router-dom'
import { convertDate } from '../helpers/convertDate'
const BlogCard = ({thumbnail, title, tags, _id, createdAt, author, profileImage}) => {
 
  return (
    <Link to={`/blog/${_id}`} className='relative flex flex-col md:flex-row py-2 gap-3 justify-start items-center md:px-2 rounded-2xl shadow-lg bg-gray-100 w-full h-fit'>
        <img src={thumbnail} alt="thumbnail"
        className=' w-[96%] md:w-[20vw] rounded-2xl md:rounded-2xl ' />
        <div className='px-3 w-full md:px-0'>
            <h3 className='text-lg font-semibold'>{title?.length > 30 ? title.slice(0, 30)+"..." : title}</h3>
            <div className='flex gap-2 py-2'>
               
             {
              tags?.map((tag, i)=>(

                <span key={i} className='px-2 py-1 
                bg-gray-200  
                text-gray-800 text-xs ms:text-sm  rounded-md font-semibold shadow-md capitalize'>{tag}</span>
               
              ))
             }
                
                </div>
                <hr className='my-2'/>
                <div className='flex justify-start items-center gap-3 '>
                   


                    <img
  src={profileImage ? profileImage : 'https://img.icons8.com/?size=100&id=x2tr2g6eXjMc&format=png&color=000000'}
  alt={author ? `${author}'s profile` : 'Profile'}
  className="w-[40px] h-[40px] rounded-full border-2 border-gray-200 shadow-md object-cover"
/>

                    <div>
                        <h4 className='text-xs font-semibold uppercase text-gray-700 font-sans'>{author}</h4>
                        <p className='text-xs font-semibold uppercase text-gray-700 font-sans'>{convertDate(createdAt)}</p>
                    </div>
                </div>
        </div>
    </Link>
  )
}

export default BlogCard