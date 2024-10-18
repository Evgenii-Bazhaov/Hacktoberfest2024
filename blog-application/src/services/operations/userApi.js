import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../reducer/authSlice"
import { setUser } from "../../reducer/profileSlice"
import { apiConnector } from "../apiConnector"

export function signup(username,email,password,confirmPassword,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", "http://localhost:4000/api/signup", {
        username,
        email,
        password,
        confirmPassword,
      })

      console.log("SIGNUP api response: ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP api error: ", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(content, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        console.log("hello1")
      const response = await apiConnector("POST", "http://localhost:4000/api/login", {
        content,
        password,
      })
      console.log("hello2")
      console.log("LOGIN api response: ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/")
    } catch (error) {
      console.log("LOGIN api error: ", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export const checkUsername = async(username) => {
      const toastId = toast.loading("Loading...")
      let result = null;
      try {
        const response = await apiConnector("POST", "http://localhost:4000/api/check-username", {username})
        console.log("check username api response: ", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        result = response;
      } catch (error) {
        console.log("Create Post api error: ", error)
      }
      toast.dismiss(toastId)
      return result;
}

export function createPost(title,content, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", "http://localhost:4000/api/create-post", {title,content}, {Authorization: `Bearer ${token}`})
  
        console.log("CreatePost api response: ", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Post created Successful")
        navigate("/")
      } catch (error) {
        console.log("Create Post api error: ", error)
        toast.error(error.response.data.message)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}

export const deletePost = async(postId, token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
      const response = await apiConnector("DELETE", "http://localhost:4000/api/delete-post", postId, {Authorization: `Bearer ${token}`});
      console.log("Delete Post api response: ", response);
      if (!response?.data?.success) {
          throw new Error("Could not delete post")
        }
      toast.success("Post Deleted successfully")
  }
  catch(error){
      console.log("Delete post api error: ", error)
      toast.error(error?.response?.data?.message)
  }
  toast.dismiss(toastId)
  return result;
}

export const editPost = async (postId, title, content, token, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", `http://localhost:4000/api/update-post/${postId}`, { title, content }, { Authorization: `Bearer ${token}` });
    console.log("Edit post API response: ", response);
    if (!response.data.success) {
      throw new Error("Could Not Update Post");
    }
    toast.success("Post Updated Successfully");
    navigate("/");
  } catch (error) {
    console.log("Edit post API error: ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};


export const getAllPosts = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", "http://localhost:4000/api/posts");
        console.log("GetAllPosts api response: ", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
          }
          result = response.data.data;
          // toast.success("All posts are retreived")
    }
    catch(error){
        console.log("Get all posts api error: ", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result;
}

export const getUserPost = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", "http://localhost:4000/api/user-posts", null,{ Authorization: `Bearer ${token}`});
        console.log("GetAllPosts api response: ", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
          }
        // toast.success("All posts are retreived")
        result = response.data.data;
    }
    catch(error){
        console.log("Get all posts api error: ", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result;
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export const getPostById = async (id) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
      const response = await apiConnector("GET", `http://localhost:4000/api/postById/${id}`);
      console.log("getPostById api response: ", response);
      if (!response.data.success) {
          throw new Error(response.data.message)
        }
        result = response.data.data;
        // toast.success("All posts are retreived")
  }
  catch(error){
      console.log("getPostById api error: ", error)
      toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return result;
}

export const getUserPostsById = async (id) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
      const response = await apiConnector("GET", `http://localhost:4000/api/userPostsById/${id}`);
      console.log("GetAllUserPosts api response: ", response);
      if (!response.data.success) {
          throw new Error(response.data.message)
        }
      // toast.success("All posts are retreived")
      result[0] = response.data.data;
      result[1] = response.data.user;
  }
  catch(error){
      console.log("Get all user posts api error: ", error)
      toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return result;
}