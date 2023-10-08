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

// export const moneyFormatter = (sum: number) => {
//
// }

export const formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'Sum',
    minimumFractionDigits: 0

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
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