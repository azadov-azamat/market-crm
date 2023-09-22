import Magazine from "../view/magazines/magazine.tsx";
import ProductList from "../view/products/list.tsx";
import Basket from "../view/baket";
import ViewProduct from "../view/products/view.tsx";


export const routes = [
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
    }
]