// import React from 'react';

import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {useEffect} from "react";
import {getSales, getStores} from "../../redux/reducers/variable.ts";

export default function SoldProducts() {

    const dispatch = useAppDispatch()
    const {stores} = useAppSelector(state => state.variables)

    const breadCumbc: BreadCumbsDataProps[] = [
        {
            name: "Do'kon",
            link: "/seller/magazines"
        },
        {
            name: stores.find(item => item.id === Number(getMgId()))?.storeName || "",
            link: `/seller/products/${getMgId()}`
        },
        {
            name: "Sotilgan mahsulotlar",
            link: ``
        }
    ]

    useEffect(() => {
        dispatch(getSales({}))
        dispatch(getStores())
    }, [])

    return (
        <div>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
        </div>
    );
}