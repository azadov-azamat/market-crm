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

export const getCheckFile = () => {
    // axios.get(baseUrl + `/sales/file/${id}`, {
    //     headers: {
    //         AccessControlAllowOrigin: "*",
    //         ContentType: "application/json",
    //         Authorization: getAuthorizationHeader()
    //     }
    // })
    // const uri = baseUrl + `/sales/file/${id}`
    // fetch(uri, {
    //     method: "GET",
    //     dataType: "binary",
    //     xhrFields: {
    //         responseType: 'blob'
    //     },
    //     headers: {
    //         AccessControlAllowOrigin: "*",
    //         Authorization: getAuthorizationHeader()
    //     },
    //     processData: false
    // })
    //     .then(res => {
    //         if (res?.status === 403) {
    //             toast.error("pin-kod noto`g`ri!")
    //         } else if (res?.status === 404) {
    //             toast.error("siz izlagan fayl topilmadi!")
    //         } else {
    //             res.arrayBuffer().then(result => {
    //                 console.log(result)
    //                 const file = new Blob([result])
    //
    //                 const fileURL = URL.createObjectURL(file)
    //                 const link = document.createElement('a')
    //                 console.log(file)
    //                 link.href = fileURL
    //                 link.download = `file.pdf`
    //                 link.click()
    //             })
    //         }
    //     })
}