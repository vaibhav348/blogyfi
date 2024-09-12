import axios from "axios"

export const getBlogs = async()=>{
    const res = await axios.get("https://blogyfi.onrender.com/api/allBlogs");
    const data = await res.data;
    return data.blogs
}