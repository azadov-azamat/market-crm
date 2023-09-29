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

export interface PortfolioDataProps {
    id: number,
    title: string,
    desc: string,
    src: string,
    owner: string,
    hash: string[],
    position: string;
    url: string;
    start_date: string;
    final_date: string;
    manager: string;
    status: boolean;
}

export interface userDataProps {
    full_name: string;
    birthdate: string;
    address: string;
    description: string;
    phone_number: string;

}