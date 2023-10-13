import {DataProps} from "./variable.interface.ts";

export interface FirmCurrencyInterface{
    firms: firmDataProps[] | [];
    firm: firmDataProps | null;
    currencies: currencyDataProps[] | [];
    currency: currencyDataProps | null;

    currentPage: number;
    pageCount: number;
    limit: number;
    totalCount: number;
    loading: boolean;
}

export interface firmDataProps extends DataProps {
    firmName: string;
    firmINN: number;
}
export interface currencyDataProps extends DataProps {
    currencyOption: string;
    currencyMoney: number;
    firmId: number;
}