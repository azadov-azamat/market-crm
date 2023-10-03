// import React from 'react';

import ProductBox from "../../components/box/product-box.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {ProductsDataProps} from "../../interface/redux/variable.interface.ts";
import {useLocation} from "react-router-dom";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import React from "react";
import {getProducts, getStores} from "../../redux/reducers/variable.ts";

interface Pr {
    isView?: boolean
}

export default function ProductList({isView}: Pr) {

    const dispatch = useAppDispatch()
    const {pathname} = useLocation()

    const {products, stores} = useAppSelector(state => state.variables)

    React.useEffect(() => {
        dispatch(getStores())
    }, [])

    React.useEffect(() => {
        dispatch(getProducts())
    }, [])


    const breadCumbc: BreadCumbsDataProps[] = [
        {
            name: "Do'kon",
            link: "/seller/magazines"
        },
        {
            name: stores.find(item => item.id === Number(getMgId()))?.storeName || "",
            link: ``
        }
    ]

    return (
        <div
            className={"flex flex-col gap-2"}>
            {!isView && <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>}
            <div
                className="product-list w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                {
                    products.filter(item => item.storeId === Number(getMgId())).map((item: ProductsDataProps, ind) => {
                        if (pathname !== `/seller/product/${item.id}`)
                            return (
                                <ProductBox
                                    key={ind}
                                    storeId={item.storeId}
                                    productName={item.productName}
                                    productPrice={item.productPrice}
                                    id={item.id}
                                    adressId={item.adressId}
                                    productImgUrl={item.productImgUrl}
                                    productMeasure={item.productMeasure}
                                    productQuantity={item.productQuantity}
                                    productModel={item.productModel}
                                    productOption={item.productOption}
                                />
                            )
                    })
                }
            </div>
        </div>
    );
}