import Magazine from "../view/magazines/magazine.tsx";
import ProductList from "../view/products/list.tsx";
import Basket from "../view/basket";
import ViewProduct from "../view/products/view.tsx";
import Debtors from "../view/debtors";
import Profile from "../view/profile";
import AddProduct from "../view/products/add.tsx";
import NotFound from "../view/error/not-found.tsx";
import SoldProducts from "../view/sales/sold.tsx";
import ViewSales from "../view/sales/view.tsx";
import ViewDebtor from "../view/debtors/view.tsx";
import Firms from "../view/firms";
import FirmView from "../view/firms/view.tsx";

export const routes = [
    {
        id: 0,
        name: 'not-found',
        path: '*',
        component: NotFound
    },
    {
        id: 1,
        name: 'magazines',
        path: '/seller/magazines',
        component: Magazine
    },
    {
        id: 2,
        name: 'products',
        path: '/seller/products/:id',
        component: ProductList
    },
    {
        id: 3,
        name: 'baskets',
        path: '/seller/baskets',
        component: Basket
    },
    {
        id: 4,
        name: 'view-product',
        path: '/seller/product/:id',
        component: ViewProduct
    },
    {
        id: 5,
        name: 'list-debtors',
        path: '/seller/debtors',
        component: Debtors
    },
    {
        id: 6,
        name: 'view-profile',
        path: '/seller/profile',
        component: Profile
    },
    {
        id: 7,
        name: 'add-product',
        path: '/seller/add-product',
        component: AddProduct
    },
    {
        id: 8,
        name: 'sold-product',
        path: '/seller/sold-products',
        component: SoldProducts
    },
    {
        id: 9,
        name: 'view-sale',
        path: '/seller/sold-product/:id',
        component: ViewSales
    },
    {
        id: 10,
        name: 'view-debtors',
        path: '/seller/debtor/:id',
        component: ViewDebtor
    },
    {
        id: 11,
        name: 'firms',
        path: '/seller/firms',
        component: Firms
    },
    {
        id: 12,
        name: 'firms',
        path: '/seller/firm/:id',
        component: FirmView
    }
]