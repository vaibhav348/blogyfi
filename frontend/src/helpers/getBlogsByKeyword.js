import axios from 'axios';

// Helper function to fetch blogs by keyword
export const getBlogsByKeyword = async (keyword) => {
  try {
    
    const res = await axios.get(`http://localhost:3100/api/getBlogsByKeyword/${keyword}`);
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
