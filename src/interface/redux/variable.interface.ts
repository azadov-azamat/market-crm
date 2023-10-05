export interface InitialStateProps {
    lang: string;
    loading: boolean;
    userData: UserDataProps | null;
    stores: StoresDataProps[] | [];
    products: ProductsDataProps[] | [];
    product: ProductsDataProps | null;
    fltProduct: ProductsDataProps[] | [];
    baskets: BasketsDataProps[] | [];
    debtor: ClientDataProps | null;
    orders: OrderDataProps[] | [];
    mixedPay: MixedPayDataProps[] | [];
    // debtors: DebtorDataProps[] | []
    adresses: AddressesDataProps[] | [];
    sales: SaleDataProps[] | [];
    sale: SaleDataProps;
    clients: ClientDataProps[] | [];
    client: ClientDataProps | null;

    currentPage: number;
    pageCount: number;
    limit: number;
    totalCount: number;
}

export interface SaleDataProps extends DataProps {
    saleMainPrice: number;
    saleSoldPrice: number;
    saleDebt: boolean;
    comment: string;
    clientId: number | null;
    storeId: number;
    sellerId: number;
    payments: MixedPayDataProps[] | [];
    seller?: UserDataProps | null,
    store?: StoresDataProps | null
    client?: ClientDataProps | null
    soldProducts: SoldProductDataProps[] | [];
}

export interface SoldProductDataProps extends DataProps {
    productId: number;
    soldPrice: number;
    soldQuantity: number;
    soldProductName: string;
}

export interface DebtorDataProps {
    debt: number;
    clientId: number;
    saleId?: number;
    storeId?: number;
}

export interface LoginDataProps {
    sellerPassword: string;
    sellerPhone: string;
}

export interface AddressesDataProps extends DataProps {
    adressName: string,
}


export interface OrderDataProps {
    // debtor: DebtorDataProps,
    baskets: BasketsDataProps,
    commit: string;
}

export interface MixedPayDataProps extends DataProps {
    paymentType: string;
    paymentAmount: number;
}

// export interface DebtorDataProps {
//     clientId: number;
// }

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

export interface UserDataProps extends DataProps {
    sellerName: string;
    sellerPhone: string;
    sellerRole: string;
    sellerImgUrl: string;
}

export interface ClientDataProps extends DataProps {
    clientName: string;
    clientAdress: string;
    clientPaymentDate: string; // qarz qaytarish sanasi
    clientPhone: number;
}

export interface DataProps {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
}