export interface FileInitialProps {
    loading: boolean;
}

export interface LoginDataProps {
    sellerPassword: string;
    sellerPhone: string;
}

export interface AddressesDataProps extends DataProps {
    adressName: string,
}

export interface SalesDataProps {
    id: number;
    storeId: number;
    saleMainPrice: number; // asosiy narx
    saleSoldPrice: number; // chegirma bn sotilgan narx
    sellerId: number;
    saleDebt: boolean;
    comment?: string;
    soldProducts?: SoldProductDataProps[];
    payments?: MixedPayDataProps[]
    client?: ClientDataProps
}

export interface SoldProductDataProps {
    productId: number;
    soldPrice: number;
    soldQuantity: number;
}

export interface OrderDataProps {
    debtor: DebtorDataProps,
    baskets: BasketsDataProps,
    commit: string;
}

export interface MixedPayDataProps {
    paymentType: string;
    paymentAmount: number;
}

export interface DebtorDataProps {
    name: string;
    phoneNumber: string;
    expDate: string;
    paidSum: number;
    givenSum: number;
    payType: string;
    address: string;
}

export interface ProductsDataProps extends DataProps {
    productName: string;
    productModel?: string;
    productOption?: string;
    productPrice: number;
    productQuantity: number;
    storeId: number;
    adressId: number;
    productImgUrl: string;
    productMeasure: string;
    adress?: AddressesDataProps;
    store?: StoresDataProps
}

export interface BasketsDataProps extends ProductsDataProps {
    amount: string;
    discount?: number;
}

export interface StoresDataProps extends DataProps {
    storeName: string;
    storeImgUrl: string;
}

export interface userDataProps extends DataProps {
    sellerName: string;
    sellerPhone: string;
    sellerRole: string;
    sellerImgUrl: string;
}

export interface ClientDataProps {
    clientName: string;
    clientAdress: string;
    clientPaymentDate: string; // qarz qaytarish sanasi
    clientPhone: number;
    clientDebtAmount: number; // qarz summasi
    clientPaidMoney: number; // to'langan summa
}

export interface DataProps {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}