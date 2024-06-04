import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"

import { endpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../slices/profileSlice"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error?.response?.data?.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(accountType,firstName,lastName,email,password,otp,navigate){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("authApi: ", otp);
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


// LOGIN

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

      // if (!response.data.success) {
      //   throw new Error(response.data.message)
      // }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        localStorage.setItem("userImage",JSON.stringify(userImage));
      dispatch(setUser({ ...response.data.user }))
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token))
      // navigate("/dashboard/my-profile");
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// LOGOUT

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userImage");
    toast.success("Logged Out")
    navigate("/")
  }
}