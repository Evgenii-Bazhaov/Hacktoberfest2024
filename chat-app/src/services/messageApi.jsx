import { toast } from "react-hot-toast"
import { apiConnector } from "./apiConnector"
import { endpoints } from "./apis"

const {ADD_MSG_API} = endpoints;

export const addMessage = (from, to, message) =>{
    return async () => {
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector("POST", ADD_MSG_API, {from,to,message,})
          console.log("ADD MESSAGE API RESPONSE............", response)
    
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
        } catch (error) {
          console.log("ADD MESSAGE  API ERROR............", error)
        }
        toast.dismiss(toastId)
      }
} 


