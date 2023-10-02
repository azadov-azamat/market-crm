import axios from "axios";

export const TOKEN = "magazine-seller"
export const baseUrl = "http://176.96.241.182:5000/api/v1"
export const uri = "https://digitaldreamsbackend.uz/"
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