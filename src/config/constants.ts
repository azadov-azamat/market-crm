import Magazine from "../view/magazines/magazine.tsx";
import ProductList from "../view/products/list.tsx";
import Basket from "../view/baket";
import ViewProduct from "../view/products/view.tsx";
import Debtors from "../view/debtors";
import Profile from "../view/profile";
import AddProduct from "../view/products/add.tsx";
import NotFound from "../view/error/not-found.tsx";
import SoldProducts from "../view/products/sold.tsx";


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
        name: 'view-debtors',
        path: '/seller/debtors',
        component: Debtors
    },
    {
        id: 6,
        name: 'view-debtors',
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
        name: 'add-product',
        path: '/seller/sold-products',
        component: SoldProducts
    }
]