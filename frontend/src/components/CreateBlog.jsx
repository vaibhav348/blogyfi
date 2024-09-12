import JoditEditor from 'jodit-react';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { uploadImage } from '../helpers/uploadImage';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import BlogContext from '../context/BlogContext';
import { checkAuth } from '../helpers/checkAuth';

const CreateBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState('');
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  
  const { isAuth, setIsAuth } = useContext(BlogContext);
  const { userData, setUserData } = useContext(BlogContext);

  useEffect(() => {
    checkAuth()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const addTag = useCallback((tag) => {
    if (tags.length < 4) {
      setTags((prev) => [...prev, tag]);
    } else {
      toast.error('Maximum of 4 tags allowed.');
    }
    setCurrentTag('');
  }, [tags]);

  const removeTag = useCallback((tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleThumbnailChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      alert('File size should be less than 1 MB.');
    } else {
      setThumbnail(file);
    }
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    
    // Validate title length (30 words max)
    const titleWordCount = title.split(' ').length;
    if (titleWordCount > 30) {
      return toast.error('Title should be less than 30 words.');
    }

    console.log(title, thumbnail, content);

    const onUploadProgress = (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    };

    try {
      const uploadedImage = await uploadImage(thumbnail, onUploadProgress);
      if (!uploadedImage) {
        return toast.error('Error uploading image.');
      }
      
      const res = await axios.post('https://blogyfi.onrender.com/api/createBlog', {
        title,
        content,
        author: userData.user.username,
        profileImage: userData.user.profileImage,
        tags,
        thumbnail: uploadedImage.url,
        publicId: uploadedImage.publicId,
      });

      const data = await res.data;
      toast.success(data.message);
      setTitle('');
      setThumbnail(null);
      setContent('');
      setProgress(0);
      setTags([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='w-[96%] md:w-[60vw] 
    bg-gradient-to-r from-indigo-500/30 from-10% via-sky-500/3- via-30% to-purple-500/30 to-90% 
    my-20 mx-auto p-4 mt-28 rounded-2xl'>
      <LoadingBar progress={progress} />
      <h3 className='text-2xl text-gray-600 text-center'>Write. Share. Inspire.</h3>
      <form onSubmit={createPost} className='grid-cols-1 gap-3 my-6'>
        <div className='flex flex-col'>
          <label htmlFor='title' className='text-lg font-semibold text-gray-600'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Enter your title here'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='thumbnail' className='text-lg font-semibold text-gray-600'>Thumbnail</label>
          <input
            type='file'
            name='thumbnail'
            id='thumbnail'
            required
            tabIndex={1}
            onChange={handleThumbnailChange}
            className='rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='tag' className='text-lg font-semibold text-gray-600'>Tags</label>
          <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0'>
            <input
              type='text'
              name='tag'
              id='tag'
              placeholder='Enter your tags here'
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className='rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100 w-full md:w-[85%]'
            />
            <button
              type='button'
              onClick={() => addTag(currentTag)}
              className='py-2 px-8 text-base bg-gradient-to-r from-teal-500 to-purple-500 rounded-3xl text-white font-semibold w-fit'
            >
              Add
            </button>
          </div>
          <label htmlFor='tags' className='text-lg font-semibold text-gray-600'>Selected tags</label>
          <div className='bg-gray-100 rounded-2xl'>
            {tags.map((tag, i) => (
              <div key={i} className='flex justify-between items-center px-2 capitalize'>
                <span>{tag}</span>
                <MdDelete className='text-red-400 hover:text-red-600 cursor-pointer' onClick={() => removeTag(tag)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor='editor' className='text-lg font-semibold'>Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
          <button
            type='submit'
            className='py-2 px-8 text-base bg-gradient-to-r from-teal-500 to-purple-500 hover:from-pink-500 hover:to-orange-500 rounded-3xl text-white font-semibold w-fit mt-2'
          >
            Create blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
