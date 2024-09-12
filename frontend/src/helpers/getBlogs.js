import axios from "axios"

export const getBlogs = async()=>{
    const res = await axios.get("http://localhost:3100/api/allBlogs");
    const data = await res.data;
    return data.blogs
}