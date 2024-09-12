import axios from "axios";

export const getBlogById = async (id) => {
  const res = await axios.get(`https://blogyfi.onrender.com/api/getBlogById/${id}`);
  const data = await res.data;
  return data.blog;
};