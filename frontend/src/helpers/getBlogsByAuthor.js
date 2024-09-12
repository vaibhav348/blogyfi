import axios from 'axios';

// Helper function to fetch blogs by owner
export const getBlogsByAuthor = async (owner) => {
  try {
    
    const res = await axios.get(`https://blogyfi.onrender.com/api/getBlogsByAuthor/${owner}`);
    console.log("helper");
    
    // Check if the request was successful
    if (res.data.success) {
      return res.data.blogs; // Assuming the API returns blogs in the 'blogs' array
    } else {
      throw new Error(res.data.message || "Failed to fetch blogs.");
    }
  } catch (error) {
    console.error("Error fetching blogs2:", error.message);
    throw error; // Throw the error to handle it in the calling function
  }
};
