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