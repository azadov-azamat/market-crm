import axios from "axios";

export const TOKEN = "magazine-seller"
// export const baseUrl = "https://guzarpost.uz/api/v1"
export const baseUrl = "https://marketlochin.uz/api/v1";
export const noIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKYUV7MhggIFbp11n_GaG__uYdPIWh8wTtyt9wtgldalCnN1qMvghZ0uholPhmV2jHmHc&usqp=CAU'
export const getToken = () => localStorage.getItem(TOKEN)

export const getAuthorizationHeader = (): string => `Bearer ${getToken()}`;

export const http = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        AccessControlAllowOrigin: "*",
        AccessControlAllowCredentials: true,
        AccessControlAllowMethods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }
})

export const http_auth = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        AccessControlAllowOrigin: "*",
        AccessControlAllowCredentials: true,
        AccessControlAllowMethods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        ContentType: "application/json",
        Authorization: getAuthorizationHeader()
    }
})