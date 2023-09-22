export interface InitialStateProps {
    lang: string;
    loading: boolean;
    userData: userDataProps | null;
    magazines: MagazinesDataProps[] | [];
    products: ProductsDataProps[] | [];
    fltProduct: ProductsDataProps[] | [];
    baskets: BasketsDataProps[] | [];
    debtor: DebtorDataProps | null;
    orders: OrderDataProps[] | [];
}

export interface OrderDataProps {
    debtor: DebtorDataProps,
    baskets: BasketsDataProps,
    commit: string;
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
    id: number;
    name: string;
    price: number;
    count: number;
    src: string;
    measure: string;
}

export interface BasketsDataProps extends ProductsDataProps {
    amount: number;
    discount?: number;
}

export interface MagazinesDataProps {
    id: number;
    name: string;
    src: string;
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