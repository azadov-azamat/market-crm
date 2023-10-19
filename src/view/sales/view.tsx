import React from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {getSaleById, getStores} from '../../redux/reducers/variable'
import {BreadCumbsDataProps} from '../../interface/modal/modal.interface'
import {formatter, getCheckFile, getMgId, handleSwitchPayType, roundMath} from '../../config/servise'
import BreadcumbsComponent from '../../components/page-title/breadcumbs'
import {Card, CardBody, Typography} from '@material-tailwind/react'
import DateFormatClockComponent from '../../components/date-format/oclock'
import DateFormatComponent from '../../components/date-format'
import {FiExternalLink} from 'react-icons/fi'
import {HiQrCode} from "react-icons/hi2";

export default function ViewSales() {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {stores, sale} = useAppSelector(state => state.variables)

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
            link: `/seller/sold-products`
        },
        {
            name: String(id),
            link: ``
        }
    ]

    React.useEffect(() => {
        dispatch(getStores())
    }, [])

    React.useEffect(() => {
        dispatch(getSaleById(String(id)))

        return () => {
            dispatch({
                type: 'sale/getSaleById/fulfilled',
                payload: {
                    data: null
                }
            })
        }
    }, [id])

    return (
        <div className={"flex flex-col gap-2"}>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
            <div className="">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <Card className='px-4 py-3 md:w-9/12 w-full relative'>
                        <CardBody className='p-0'>
                            <div className="flex">
                                <Typography variant="small" className="text-base font-bold">Do'kon: &nbsp;</Typography>
                                <Typography variant="small" className="text-base"> {sale?.store?.storeName}</Typography>
                            </div>

                            <div className="flex">
                                <Typography variant="small" className="text-base font-bold">Umumiy
                                    narxi: &nbsp;</Typography>
                                <Typography variant="small"
                                            className="text-base"> {formatter.format(sale?.saleMainPrice || 0)}</Typography>
                            </div>

                            <div className="flex">
                                <Typography variant="small" className="text-base font-bold">Sotilgan
                                    narxi: &nbsp;</Typography>
                                <Typography variant="small"
                                            className="text-base"> {formatter.format(sale?.saleSoldPrice || 0)}</Typography>
                            </div>

                            <div className="flex">
                                <Typography variant="small" className="text-base font-bold">Sotuv
                                    sanasi: &nbsp;</Typography>
                                <Typography variant="small" className="text-base"><DateFormatClockComponent
                                    currentDate={sale?.createdAt}/></Typography>
                            </div>

                            <div className="flex">
                                <Typography variant="small"
                                            className="text-base font-bold">Sotuvchi: &nbsp;</Typography>
                                <Typography variant="small"
                                            className="text-base"> {sale?.seller?.sellerName}</Typography>
                            </div>
                        </CardBody>
                        {sale?.saleDebt && <div
                            className="absolute text-xs px-2 bg-red-500 text-white rounded right-1 top-1">qarz-savdo</div>}
                        <div className="absolute text-3xl cursor-pointer bottom-2 right-2">
                            <HiQrCode onClick={() => getCheckFile(sale?.id || 0)}/>
                            {/*<a href={baseUrl + `/sales/file/${sale?.id}`}>*/}
                            {/*    <HiQrCode/>*/}
                            {/*</a>*/}
                        </div>
                    </Card>
                    <Card className='px-4 py-3 md:w-9/12 w-full'>
                        <CardBody className='p-0'>
                            {
                                sale && sale.soldproducts?.length > 0 ? <div className="sold-product my-2">
                                    <Typography variant="paragraph">Sotilgan mahsulotlar: </Typography>
                                    <div className="flex ">
                                        <div className="w-1/3 text-base font-bold">Nomi</div>
                                        <div className="w-1/3 text-base font-bold">Naxi</div>
                                        <div className="w-1/3 text-base font-bold">Soni</div>
                                    </div>
                                    <div className="">
                                        {
                                            sale?.soldproducts?.map((pr, ip) => {
                                                return (
                                                    <div className="flex relative" key={ip}>
                                                        <div className="w-1/3">{pr.soldProductName}</div>
                                                        <div className="w-1/3">{formatter.format(roundMath(pr.soldPrice))}</div>
                                                        <div className="w-1/3">{pr.soldQuantity} {pr.soldProductMeasure}</div>
                                                        <div className="absolute right-0">
                                                            <FiExternalLink
                                                                className="text-green-500 text-base cursor-pointer"
                                                                onClick={() => {
                                                                    localStorage.setItem("mgId", String(sale?.storeId))
                                                                    navigate(`/seller/product/${pr.productId}`)
                                                                }}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div> : ""
                            }
                        </CardBody>
                    </Card>
                    <Card className='px-4 py-3 md:w-9/12 w-full'>
                        <CardBody className='p-0'>
                            {
                                sale && sale.payments?.length > 0 ? <div className="sold-product my-2">
                                    <Typography variant="paragraph">To'lovlar: </Typography>
                                    <div className="flex ">
                                        <div className="w-1/12 text-base font-bold">#</div>
                                        <div className="w-4/12 text-base font-bold">Summa</div>
                                        <div className="w-7/12 text-base font-bold">Turi</div>
                                    </div>
                                    <div className="">
                                        {
                                            sale?.payments?.map((pr, ip) => {
                                                return (
                                                    <div className="flex" key={ip}>
                                                        <div className="w-1/12">{ip + 1}</div>
                                                        <div
                                                            className="w-4/12">{formatter.format(pr.paymentAmount)}</div>
                                                        <div
                                                            className="w-7/12">{handleSwitchPayType(pr.paymentType)}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div> : ""
                            }
                        </CardBody>
                    </Card>

                    <Card className='px-4 py-3 md:w-9/12 w-full relative'>
                        <CardBody className='p-0'>
                            {
                                sale?.saleDebt ? <div className="sold-product my-2">
                                    <Typography variant="small" className="text-base">Xaridor: &nbsp;</Typography>
                                    <div className="text-base"><b
                                        className='ml-3'>F.I.O: &nbsp;</b> {sale?.client?.clientName}</div>
                                    <div className="text-base"><b className='ml-3'>Telefon
                                        raqami: &nbsp;</b> {sale?.client?.clientPhone}</div>
                                    <div className="text-base"><b
                                        className='ml-3'>Manzili: &nbsp;</b> {sale?.client?.clientAdress}</div>
                                    <div className="text-base"><b className='ml-3'>To'lov sanasi: &nbsp;</b>
                                        <DateFormatComponent currentDate={sale?.client?.clientPaymentDate}/></div>

                                </div> : <div className="flex items-center justify-center">
                                    <b>Xaridor biriktirilmagan</b>
                                </div>
                            }
                        </CardBody>
                        {sale?.saleDebt && <div className="absolute -right-1 -top-1">
                            <FiExternalLink className="text-green-500 text-xl cursor-pointer"
                                            onClick={() => navigate(`/seller/debtor/${sale?.client?.id}`)}/>
                        </div>}
                    </Card>
                </div>
                <Card className='px-4 py-3 w-full my-5'>
                    <CardBody className='p-0'>
                        <div className="flex ">
                            <Typography variant="small" className="text-base font-bold">Sharx: &nbsp;</Typography>
                            <Typography variant="small" className="text-base"> {sale?.comment}</Typography>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}