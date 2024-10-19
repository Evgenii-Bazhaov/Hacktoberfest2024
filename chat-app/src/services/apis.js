export const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    USER_API: BASE_URL + "/profile/getAllUsers",
    ADD_MSG_API: BASE_URL + "/message/addMsg",
    GET_ALL_MSG_API: BASE_URL + "/message/getMsg"
}
