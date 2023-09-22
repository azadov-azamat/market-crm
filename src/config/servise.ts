export function handleNumberMask(text: string): number {
    return Number(text.replace(/[^0-9.]/g, ''));
}

export function handleSwitchPayType(text: string): string {
    switch (text) {
        case "debt-pay":
            return "Qarz to'lovi"
        case "terminal-pay":
            return "Terminal orqali (Uzcard/Humo)"
        case "cash-pay":
            return "Naxd to'lov"
        case "click-pay":
        default:
            return "Online to'lov (click)"
    }
}