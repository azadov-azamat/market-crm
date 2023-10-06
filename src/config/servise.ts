import axios from "axios";
import { baseUrl, getAuthorizationHeader } from "./api";

export function handleNumberMask(text: string) {
    return text.replace(/[^0-9.]/g, '');
}

export function handleSwitchPayType(text: string): string {
    switch (text) {
        case "debt-pay":
            return "Qarz to'lovi"
        case "terminal":
            return "Terminal orqali (Uzcard/Humo)"
        case "naqd":
            return "Naxd to'lov"
        case "mixed-pay":
            return "Aralash to'lov"
        case "transfer":
        default:
            return "Online to'lov (click)"
    }
}

export const getMgId = () => localStorage.getItem("mgId")

export const getCheckFile =(id: string)=>{
    axios.get(baseUrl + `/sales/file/${id}`, {
        headers: {
            AccessControlAllowOrigin: "*",
            ContentType: "application/json",
            Authorization: getAuthorizationHeader()
        }          
    })
}