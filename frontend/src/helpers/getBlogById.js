import axios from "axios";

export const getBlogById = async (id) => {
  const res = await axios.get(`http://localhost:3100/api/getBlogById/${id}`);
  const data = await res.data;
  return data.blog;
};