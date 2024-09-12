import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdAccountCircle, MdEdit, MdDelete } from "react-icons/md";
import BlogCard from "../components/BlogCard";
import { useContext, useState, useEffect, useRef } from "react";
import BlogContext from "../context/BlogContext";
import { getBlogById } from "../helpers/getBlogById";
import { getBlogs } from "../helpers/getBlogs";
import { convertDate } from "../helpers/convertDate";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [blogComments, setBlogComments] = useState([]);
  const [editedComment, setEditedComment] = useState("");
  const [editContent, setEditContent] = useState(false);
  const [postId, setPostId] = useState("");

  const {
    userAuthenticated,
    setUserAuthenticated,
    currentUserId,
    setCurrentUserId,
    userName,
    setUserName,
    userImage,
    setUserImage,
  } = useContext(BlogContext);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, photoURL, uid } = result.user;
        setUserName(displayName);
        setUserImage(photoURL);
        setCurrentUserId(uid);
        setUserAuthenticated(true);
        toast.success(`Welcome ${displayName} 👋`);
      })
      .catch((err) => toast.error(err.message));
  };

  const signOutWithGoogle = () => {
    auth.signOut().then(() => {
      setUserAuthenticated(false);
      setUserName("");
      setUserImage("");
      setCurrentUserId("");
      toast.success("Logged out successfully");
    });
  };

  const addComment = async () => {
    if (!userAuthenticated) {
      return toast.error("Please login to comment");
    }
    if (newComment.trim() === "" || newComment.split(" ").length < 3) {
      toast.error("Comment should be at least 3 words long");
      return;
    }
    const res = await axios.post(`https://blogyfi.onrender.com/api/addComment/${id}`, {
      comment: newComment,
      userName,
      userImage,
      userId: currentUserId,
    });
    const data = await res.data;
    toast.success(data.message);
    getComments(id);
    setNewComment("");
  };

  const getComments = async (id) => {
    const res = await axios.get(`https://blogyfi.onrender.com/api/getComments/${id}`);
    const data = await res.data;
    setBlogComments(data.comments);
  };

  const updateComment = async (commentId) => {
    try {
      const res = await axios.put(
        `https://blogyfi.onrender.com/api/updateComment/${id}/${commentId}`,
        {
          comment: editedComment,
        }
      );
      const data = await res.data;
      toast.success(data.message);
      getComments(id);
      setEditContent(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `https://blogyfi.onrender.com/api/deleteComment/${id}/${commentId}`
      );
      const data = await res.data;
      toast.success(data.message);
      getComments(id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getBlogById(id)
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
    getComments(id);
  }, [id]);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  const editableContentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const div = document.getElementById("commentsDiv");
      const button = document.getElementById("saveButton");
      if (
        div &&
        !div.contains(e.target) &&
        e.target !== editableContentRef.current &&
        !(button && button.contains(e.target))
      ) {
        setEditContent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEditContent]);

  // Scroll to Top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="overflow-hidden">
      {/* NAVIGATION BAR */}
      <nav className="px-4 py-2 border-b-1 flex gap-2 rounded-b-md shadow-md 
      bg-gradient-to-r from-blue-200/30 to-purple-300/30 backdrop-blur-lg dark:bg-gray-300/30 dark:backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
        <Link
          to="/"
          className="font-semibold flex justify-center text-base items-center gap-2 text-gray-800 hover:text-gray-600 transition-all duration-300 ease-in-out"
        >
          <AiFillHome /> <span>Home /</span>
        </Link>
        <span className="text-gray-100 text-base cursor-pointer bg-zinc-950/30 px-2 rounded-md">
          {blog.title?.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title}
        </span>
      </nav>

      {/* BLOG */}
      <div className="flex md:px-5 gap-3 md:gap-5 flex-col md:flex-col 
      bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-purple-500 to-90%">
        {/* SELECTED BLOG SECTION */}
        <div className="w-[94%] bg-white mx-auto p-4 rounded-lg mt-16">
          <h1 className="text-2xl font-bold my-4">{blog.title}</h1>
          <img
            src={blog.thumbnail}
            alt="blog's thumbnail"
            className="w-full md:w-[60%] m-auto object-cover rounded-2xl shadow-md"
          />
          <div className="flex gap-2 my-4 md:my-10">
            {blog.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-gray-900 text-xs md:text-sm bg-gray-300 rounded-md font-semibold shadow-md capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
          <hr />
          <div className="my-5">
            <p
              className="overflow-x-clip"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></p>
          </div>
          <hr/>
          <div className="flex mt-5 justify-start items-center gap-3 text-base">
            <img
              src={blog.profileImage ? blog.profileImage : 'https://img.icons8.com/?size=100&id=x2tr2g6eXjMc&format=png&color=000000'}
              alt={`${userName}'s profile`}
              className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 shadow-lg object-cover"
            />
            <div>
              <h4 className="font-bold">{blog.author}</h4>
              <p className="font-bold">{convertDate(blog.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* SIDEBAR FOR BLOGS */}
        <div className="md:flex justify-around mb-10 p-5 bg-white w-[94%] m-auto rounded-md">
          <div className="md:w-[50%] p-4 rounded-md bg-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 ml-3 my-2">
              Other blogs
            </h3>
            <div className="grid grid-cols-1 gap-3 h-[80vh] overflow-y-auto px-3 pb-2 my-3 scrollbar-blue">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} {...blog} />
              ))}
            </div>
          </div>
          <div className="md:w-[45%] p-4 rounded-md bg-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 ml-3 mt-2">
              Comments
            </h3>
            <div>
              {/* ADDING COMMENTS */}
              <div className="flex justify-between items-start gap-3 my-5">
                {userAuthenticated ? (
                  <img
                    src={userImage ? userImage : 'https://img.icons8.com/?size=100&id=x2tr2g6eXjMc&format=png&color=000000'}
                    alt={`${userName}'s profile`}
                    className="w-[50px] rounded-full"
                  />
                ) : (
                  <MdAccountCircle className="text-5xl text-gray-600" />
                )}
                <div className="flex flex-col w-full gap-3">
                  <textarea
                    name="message"
                    id="message"
                    rows="2"
                    placeholder="Write a comment"
                    className="md:w-[35vw] rounded-lg py-2 outline-none shadow-md text-base px-3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <div className="flex gap-3">
                    <button
                      onClick={addComment}
                      className="text-white bg-gradient-to-r from-teal-500 to-purple-500 hover:from-pink-500 hover:to-orange-500 px-4 py-2 md:py-1 h-fit text-base font-semibold transition-all duration-500 ease-linear rounded-md w-fit"
                    >
                      Add
                    </button>
                    <button
                      className="text-white bg-gradient-to-r from-teal-500 to-purple-500 hover:from-pink-500 hover:to-orange-500 px-4 py-2 md:py-1 h-fit text-base font-semibold transition-all duration-500 ease-linear rounded-md w-fit"
                      onClick={
                        !userAuthenticated ? signInWithGoogle : signOutWithGoogle
                      }
                    >
                      {!userAuthenticated ? "Sign In With Google" : "Sign Out"}
                    </button>
                  </div>
                </div>
              </div>

              {/* LISTING COMMENTS */}
              <div>
                {blogComments?.map(
                  ({ comment, userName, userImage, userId, _id }) => (
                    <div
                      className="m-0 md:m-4 flex flex-row justify-start items-center md:gap-3 my-3"
                      key={_id}
                      id="commentsDiv"
                    >
                      <img
                        src={userImage}
                        alt={userName}
                        className="rounded-full mr-4 md:mr-0 md:block w-[50px] h-[50px] bg-cover text-gray-600"
                      />
                      <div className="bg-white w-full md:w-[35vw] rounded-lg py-2 text-sm md:text-base px-3 shadow-md">
                        <div className="flex justify-between">
                          <span className="text-xs md:text-sm font-semibold">
                            {currentUserId === userId ? "You" : userName}
                          </span>
                          {currentUserId === userId && (
                            <div className="flex gap-1">
                              <MdEdit
                                onClick={() => {
                                  setEditContent(!editContent);
                                  setPostId(_id);
                                }}
                                className="text-gray-500 hover:text-purple-500 hover:scale-105 transition-all ease-in-out cursor-pointer"
                              />
                              <MdDelete
                                onClick={() => deleteComment(_id)}
                                className="text-gray-500 hover:text-purple-500 hover:scale-105 transition-all ease-in-out cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                        <p
                          className={`outline-none ${editContent &&
                            postId === _id &&
                            currentUserId === userId &&
                            "bg-gray-100 shadow-inner pl-1 rounded-md my-3 transition-all duration-500 ease-in-out"
                            }`}
                          ref={editableContentRef}
                          onInput={(e) => setEditedComment(e.target.textContent)}
                          contentEditable={editContent}
                        >
                          {comment}
                        </p>
                        {editContent &&
                          postId === _id &&
                          currentUserId === userId && (
                            <button
                              onClick={() => updateComment(_id)}
                              className="bg-purple-500 hover:bg-purple-600 px-3 py-1 text-white text-sm rounded-lg"
                              id="saveButton"
                            >
                              Save
                            </button>
                          )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
  onClick={scrollToTop}
  className="fixed bottom-10 right-5 bg-gray-500 text-white rounded-full  px-4 py-1 opacity-80 hover:opacity-100 transition-opacity duration-300 shadow-lg"
>
  &#8679; {/* Arrow up symbol */}
</button>

    </section>
  );
};

export default Blog;
