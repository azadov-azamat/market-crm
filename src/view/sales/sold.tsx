// import React from 'react';

import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {useEffect} from "react";
import {getSales, getStores} from "../../redux/reducers/variable.ts";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import {useLocation, useNavigate} from "react-router-dom";
import DateFormatClockComponent from "../../components/date-format/oclock.tsx";
import {HiQrCode} from 'react-icons/hi2'
import qs from "qs";
import {baseUrl} from "../../config/api.ts";

export default function SoldProducts() {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    const {stores, sales, client, userData} = useAppSelector(state => state.variables)
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

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
        if (client) {
            navigate({
                search: qs.stringify({
                    filter: JSON.stringify({clientId: client?.id})
                })
            })
        }else {
            navigate({
                search: qs.stringify({
                    filter: JSON.stringify({sellerId: userData?.id})
                })
            })
        }
    }, [client])

    useEffect(() => {
        if (location.search) {
            dispatch(getSales({...query}))
        } else {
            dispatch(getSales({}))
        }
    }, [location.search])

    useEffect(() => {
        dispatch(getStores())

        return () => {
            dispatch({
                type: "sale/getSales/fulfilled",
                payload: {
                    data: []
                }
            })
        }
    }, [])

    return (
        <div>
            {!client && <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>}
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
                {
                    sales.map((item, ind) => {
                        return (
                            <Card key={ind}
                                  className="relative"
                            >
                                <CardBody onClick={() => navigate(`/seller/sold-product/${item?.id}`)}
                                          className="cursor-pointer">
                                    <div className="">
                                        <Typography variant="paragraph"
                                                    className="text-base font-bold">#{ind + 1} {item?.store?.storeName}</Typography>
                                    </div>
                                    <div className="flex">
                                        <Typography variant="small"
                                                    className="text-base font-bold">Sotuvchi: &nbsp;</Typography>
                                        <Typography variant="small"
                                                    className="text-base"> {item?.seller?.sellerName}</Typography>
                                    </div>

                                    <div className="flex">
                                        <Typography variant="small" className="text-base font-bold">Umumiy
                                            narxi: &nbsp;</Typography>
                                        <Typography variant="small"
                                                    className="text-base"> {item?.saleMainPrice} sum</Typography>
                                    </div>

                                    <div className="flex">
                                        <Typography variant="small" className="text-base font-bold">Sotilgan
                                            narxi: &nbsp;</Typography>
                                        <Typography variant="small"
                                                    className="text-base"> {item?.saleSoldPrice} sum</Typography>
                                    </div>

                                    <div className="flex">
                                        <Typography variant="small" className="text-base font-bold">Sotuv
                                            sanasi: &nbsp;</Typography>
                                        <Typography variant="small" className="text-base"><DateFormatClockComponent
                                            currentDate={item?.createdAt}/></Typography>
                                    </div>
                                    {
                                        item?.soldproducts?.length > 0 && <div className="sold-product my-2">
                                            <Typography variant="paragraph">Sotilgan mahsulotlar: </Typography>
                                            <div className="flex ">
                                                <div className="w-1/3 text-base font-bold">Nomi</div>
                                                <div className="w-1/3 text-base font-bold">Naxi</div>
                                                <div className="w-1/3 text-base font-bold">Soni</div>
                                            </div>
                                            <div className="">
                                                {
                                                    item.soldproducts.map((pr, ip) => {
                                                        return (
                                                            <div className="flex" key={ip}>
                                                                <div className="w-1/3">{pr?.soldProductName}</div>
                                                                <div className="w-1/3">{pr?.soldPrice} sum</div>
                                                                <div className="w-1/3">{pr?.soldQuantity}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    }
                                    <div className="flex ">
                                        <Typography variant="small"
                                                    className="text-base font-bold">Sharx: &nbsp;</Typography>
                                        <Typography variant="small" className="text-base"> {item?.comment}</Typography>
                                    </div>
                                </CardBody>
                                {item?.saleDebt && <div
                                    className="absolute text-xs px-2 bg-red-500 text-white rounded right-1 top-1">qarz-savdo</div>}
                                <div className="absolute text-3xl cursor-pointer bottom-2 right-2">
                                    <a href={baseUrl + `/sales/file/${item?.id}`}>
                                        <HiQrCode/>
                                    </a>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
}