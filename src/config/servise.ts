import {baseUrl, getAuthorizationHeader} from "./api.ts";
import axios from "axios";

export function handleNumberMask(text: string) {
    return text.replace(/[^0-9.]/g, '');
}

export function handleSwitchPayType(text: string): string {
    switch (text) {
        case "debt-pay":
            return "Qarz to'lovi"
        case "terminal":
            return "Terminal orqali"
        case "naqd":
            return "Naqd to'lov"
        case "mixed-pay":
            return "Aralash to'lov"
        case "transfer":
        default:
            return "Online to'lov"
    }
}

export const getMgId = () => localStorage.getItem("mgId") || ""

export const formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'Sum',
    minimumFractionDigits: 0
});

export const roundMath =(sum: number): number => {
    return Math.round(sum/1000) * 1000
}

export const getCheckFile = (id: number) => {
    axios({
        url: baseUrl + `/sales/file/${id}`, //your url
        method: 'GET',
        responseType: 'blob', // important
        headers: {
            Authorization: getAuthorizationHeader(),
        }
    }).then((response) => {
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', new Date().toISOString().substring(0, 10)); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
}