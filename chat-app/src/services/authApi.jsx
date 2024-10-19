import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../slices/authSlice"
import { setUser, setLoadingProfile} from "../slices/profileSlice"
import { apiConnector } from "./apiConnector"
import { endpoints } from "./apis"

const {SIGNUP_API,LOGIN_API} = endpoints

export function signUp(firstName, lastName, email, password, confirmPassword,navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        // if (!response.data.success) {
        //   throw new Error(response.data.message)
        // }
        toast.success("Signup Successful")
        navigate('/login');
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser({...response.data.user}))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        dispatch(setLoadingProfile(true));
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function logout(navigate){
    return (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      // navigate("/")
      toast.dismiss(toastId)
    }
  }