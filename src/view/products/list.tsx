// import React from 'react';

import ProductBox from "../../components/box/product-box.tsx";
import {useAppSelector} from "../../redux/hooks.ts";
import {ProductsDataProps} from "../../interface/redux/variable.interface.ts";
import {useLocation} from "react-router-dom";

export default function ProductList() {

    const {pathname} = useLocation()
    const {products} = useAppSelector(state => state.variables)

    return (
        <div
            className={"product-list w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5"}>
            {
                products.map((item: ProductsDataProps, ind) => {
                    if (pathname !== `/seller/product/${item.id}`)
                        return (
                            <ProductBox
                                key={ind}
                                productName={item.productName}
                                productPrice={item.productPrice}
                                id={item.id}
                                productImgUrl={item.productImgUrl}
                                productMeasure={item.productMeasure}
                                productQuantity={item.productQuantity}
                            />
                        )
                })
            }
        </div>
    );
}