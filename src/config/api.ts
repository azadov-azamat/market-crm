import axios from "axios";

export const TOKEN = "dilhush.digitaldreams.uz.token"
export const baseUrl = "https://digitaldreamsbackend.uz/api"
export const uri = "https://digitaldreamsbackend.uz/"
export const socketUrl = "https://digitaldreamsbackend.uz"
export const getToken = () => localStorage.getItem(TOKEN)

export const getAuthorizationHeader = (): string => `${getToken()}`;

export const http = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json"
    }
})

export const http_auth = axios.create({
    baseURL: baseUrl,
    headers: {
        AccessControlAllowOrigin: "*",
        ContentType: "application/json",
        authorization: getToken()
    }
})