import axios from "axios";
import noImg from '../assets/noImg.png'

export const TOKEN = "magazine-seller"
// export const baseUrl = "https://guzarpost.uz/api/v1"
export const uriNbu = 'https://cbu.uz/uz'
export const baseUrl = "https://api.marketlochin.uz/api/v1";
export const noIMG = noImg
export const getToken = () => localStorage.getItem(TOKEN)

export const getAuthorizationHeader = (): string => `Bearer ${getToken()}`;

export const http = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }
})

export const http_auth = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        ContentType: "application/json",
        Authorization: getAuthorizationHeader()
    }
})

export const http_nbu = axios.create({
    baseURL: uriNbu,
    headers: {
        Accept: "application/json"
    }
})