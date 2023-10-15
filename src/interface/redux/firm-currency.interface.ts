import {DataProps} from "./variable.interface.ts";

export interface FirmCurrencyInterface{
    firms: firmDataProps[] | [];
    firm: firmDataProps | null;
    currencies: currencyDataProps[] | [];
    currency: currencyDataProps | null;
    nbu: nbuDataProps[] | [];
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

export interface nbuDataProps {
    id: number;
    Code: string;
    Ccy: string;
    CcyNm_RU: string;
    CcyNm_UZ: string;
    CcyNm_UZC: string;
    CcyNm_EN: string;
    Nominal: string;
    Rate: string;
    Diff: string;
    Date: string;
}