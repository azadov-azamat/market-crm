// import React from 'react';

import ProductBox from "../../components/box/product-box.tsx";
import {useAppSelector} from "../../redux/hooks.ts";
import {ProductsDataProps} from "../../interface/redux/variable.interface.ts";

export default function ProductList() {

    const {products} = useAppSelector(state => state.variables)

    return (
        <div
            className={"product-list w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5"}>
            {
                products.map((item: ProductsDataProps, ind) =>
                    <ProductBox
                        key={ind}
                        name={item.name}
                        src={item.src}
                        id={item.id}
                        price={item.price}
                        measure={item.measure}
                        count={item.count}
                    />
                )
            }
        </div>
    );
}