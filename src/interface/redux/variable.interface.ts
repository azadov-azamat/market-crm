export interface InitialStateProps {
    lang: string;
    loading: boolean;
    userData: userDataProps | null;
    stores: StoresDataProps[] | [];
    products: ProductsDataProps[] | [];
    fltProduct: ProductsDataProps[] | [];
    baskets: BasketsDataProps[] | [];
    debtor: DebtorDataProps | null;
    orders: OrderDataProps[] | [];
    mixedPay: MixedPayDataProps[] | [];
    debtors: DebtorDataProps[] | []
    adresses: AddressesDataProps[] | []
    sales: SalesDataProps[] | []
}

export interface LoginDataProps {
    sellerPassword: string;
    sellerPhone: string;
}
export interface AddressesDataProps {
    id: number,
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
export interface SoldProductDataProps{
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

export interface ProductsDataProps {
    id: number,
    productName: string;
    productModel?: string;
    productOption?: string;
    productPrice: number;
    productQuantity: number;
    storeId: number;
    adressId: number;
    productImgUrl: object |  string;
    productMeasure: string;
}

export interface BasketsDataProps extends ProductsDataProps {
    amount: string;
    discount?: number;
}

export interface StoresDataProps {
    id: number;
    storeName: string;
    storeImgUrl: string;
}

export interface userDataProps {
    full_name: string;
    birthdate: string;
    address: string;
    description: string;
    phone_number: string;

}
export interface ClientDataProps {
    clientName: string;
    clientAdress: string;
    clientPaymentDate: string; // qarz qaytarish sanasi
    clientPhone: number;
    clientDebtAmount: number; // qarz summasi
    clientPaidMoney: number; // to'langan summa
}