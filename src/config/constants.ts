import Magazine from "../view/magazines/magazine.tsx";
import ProductList from "../view/products/list.tsx";


export const routes = [
    {
        id: 1,
        name: 'magazines',
        path: '/magazines',
        component: Magazine
    },
    {
        id: 2,
        name: 'products',
        path: '/products/:id',
        component: ProductList
    }
]