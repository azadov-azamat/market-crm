import BasketBox from "../../components/box/basket-box.tsx";
import {Button, Card, CardBody, Radio, Typography} from "@material-tailwind/react";
import React from "react";
import {formatter, getMgId, handleSwitchPayType} from "../../config/servise.ts";
import {BiEdit} from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {DebtorSidebar} from "./debtor-sidebar.tsx";
import {MixedPaySidebar} from "./mixed-pay-sidebar.tsx";
import {createDebt, createSale, getStores, setListBasket, setMixedPayList} from "../../redux/reducers/variable.ts";
import {useNavigate} from "react-router-dom";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import DateFormatComponent from "../../components/date-format";
import * as InputComponent from "../../components/inputs";
import {DebtorDataProps, SaleDataProps, SoldProductDataProps} from "../../interface/redux/variable.interface.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { getCurrencyNbu } from "../../redux/reducers/firm-currency.ts";

export default function Basket() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {baskets, stores, client, mixedPay, userData} = useAppSelector(state => state.variables)
    const {nbu} = useAppSelector(state => state.firms)
    
    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    // const [commit, setCommit] = React.useState<string>('')
    const [totalAfterDiscount, setTotalAfterDiscount] = React.useState<number>(0)
    const [payType, setPayType] = React.useState<string>("")
    const [isDebt, setDebt] = React.useState<boolean>(false)
    const [isMixed, setMixed] = React.useState<boolean>(false)
    const toggleDebt = () => setDebt(!isDebt)
    const toggleMixed = (bool: boolean) => setMixed(bool)

      // @ts-ignore
      const dollarCur = parseInt(nbu.find(item => item.Ccy === "USD")?.Rate)

    React.useEffect(() => {
        let totalAmount = 0;
        let discountAmount = 0;
        for (const basket of baskets) {
            totalAmount += ((basket.productCurrency === 'dollar' ? (basket.productPrice * dollarCur) : basket.productPrice) * Number(basket.amount))
            discountAmount += ((basket.productCurrency === 'dollar' ? (basket.productPrice * dollarCur) : basket.productPrice) - (basket.discount || 0)) * Number(basket.amount)
        }
        setTotalPrice(totalAmount)
        setTotalAfterDiscount(discountAmount)
    }, [baskets])

    React.useEffect(() => {
        dispatch(setMixedPayList([
            {paymentAmount: totalAfterDiscount, paymentType: "transfer", storeId: getMgId()}
        ]))
        return () => {
            dispatch(setMixedPayList([]))
        }
    }, [totalAfterDiscount])


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

    const setArrayToggle = (payTy: string) => {
        toggleMixed(false)
        dispatch(setMixedPayList([
            {paymentAmount: totalAfterDiscount, paymentType: payTy, storeId: getMgId()}
        ]))
    }

    React.useEffect(() => {
        dispatch(getStores())
        dispatch(getCurrencyNbu())
    }, [])

    function setSolProduct(): SoldProductDataProps[] {
        const sold: SoldProductDataProps[] = []
        for (const basket of baskets) {
            sold.push({
                productId: basket.id || 0,
                soldPrice: Math.round((basket.productCurrency === 'dollar' ? basket.productPrice * dollarCur : basket.productPrice) - Number(basket?.discount || 0)),
                soldQuantity: Number(basket.amount),
                soldProductName: basket.productName,
                soldProductMeasure: basket.productMeasure
            })
        }
        return sold
    }

    if (baskets.length === 0) {
        return (
            <div>
                <div className="w-full overflow-ellipsis overflow-hidden">
                    <BreadcumbsComponent data={breadCumbc}/>
                </div>
                <div className={"w-full h-[80vh] flex justify-center items-center"}>
                    <div className="flex flex-col items-center gap-3">
                        <Typography variant={"h4"}>
                            Savat hozirda bo'sh
                        </Typography>
                        <Button className={"normal-case"} onClick={() => navigate(`/seller/products/${getMgId()}`)}>Mahsulot
                            tanlang</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)

                    const data: SaleDataProps = {
                        soldproducts: setSolProduct() || [],
                        storeId: Number(getMgId()),
                        saleMainPrice: totalPrice,
                        saleSoldPrice: totalAfterDiscount,
                        sellerId: userData?.id || 0,
                        saleDebt: payType === "debt-pay",
                        comment: String(formData.get("commit")),
                        payments: mixedPay,
                        clientId: client?.id || null
                    }

                    dispatch(createSale(data)).then(unwrapResult)
                        .then(res => {
                            console.log(payType)
                            if (payType === "debt-pay") {
                                let debtAmount = 0
                                for (let i = 0; i < mixedPay.length; i++) {
                                    debtAmount += mixedPay[i].paymentAmount
                                }

                                const debtData: DebtorDataProps = {
                                    storeId: Number(getMgId()),
                                    clientId: client?.id || 0,
                                    debt: -(Math.round(totalAfterDiscount - debtAmount)),
                                    saleId: res.data?.id
                                }
                                dispatch(createDebt(debtData)).then(unwrapResult)
                                    .then(() => {
                                        toast.success("Sotuv saqlandi!")
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }
                            // getCheckFile(String(res.data.id))
                            dispatch(setListBasket([]))
                            toast.success("Sotuv saqlandi!")
                            navigate(`/seller/sold-product/${res.data?.id}`)
                        })
                        .catch(err => {
                            console.log(err)
                            if (err.response.status === 404) {
                                return toast.error("Iltimos barcha maydonlar to'ldirilganligini tekshiring")
                            }
                            toast.error("Savdoni saqlashda xatolik, iltimos qayta urinib ko'ring")
                        })
                    // navigate(`/seller/products/${getMgId()}`)
                }}
                className={"flex flex-col md:flex-row w-full h-auto gap-5"}>
                <div className="w-full xl:w-7/12 flex flex-col gap-5">
                    {
                        baskets.map(({
                                         productName,
                                         amount,
                                         productImgUrl,
                                         productPrice,
                                         productMeasure,
                                         productQuantity,
                                         id,
                                         adressId,
                                         productCurrency,
                                         storeId,
                                         productMainPrice
                                     }, ind) => (
                            <BasketBox
                                storeId={storeId}
                                key={ind}
                                productMainPrice={productMainPrice}
                                amount={amount}
                                productName={productName}
                                productPrice={productPrice}
                                productCurrency={productCurrency}
                                id={id}
                                adressId={adressId}
                                productImgUrl={productImgUrl}
                                productMeasure={productMeasure}
                                productQuantity={productQuantity}
                            />
                        ))
                    }
                </div>
                <div className="w-full xl:w-4/12 flex flex-col gap-3">
                    <Card>
                        <CardBody>
                            <div className="flex justify-between border-b border-dashed py-2 mb-2">
                                <Typography variant={"small"} className={"font-bold text-base"}>To'lov turini
                                    tanlang </Typography>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Radio name={"pay-type"}
                                       onClick={() => setArrayToggle("transfer")}
                                       onChange={e => setPayType(e.target.defaultValue)}
                                       value={'transfer'}
                                       defaultChecked
                                       label={<img
                                           width={80}
                                           src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                                           alt="transfer"/>} crossOrigin={undefined}
                                />
                                <Radio name={"pay-type"}
                                       value={"debt-pay"}
                                       onClick={toggleDebt}
                                       onChange={e => {
                                           setPayType(e.target.defaultValue)
                                           dispatch(setMixedPayList([]))
                                           toggleDebt()
                                       }}
                                       label={<img
                                           width={80}
                                           src="https://ipakyulibank.uz/uploads/images/widget/2022/09/widget_1662981431_3135.png"
                                           alt="debt-pay"/>} crossOrigin={undefined}
                                />
                                <Radio name={"pay-type"}
                                       value={"naqd"}
                                       onClick={() => setArrayToggle("naqd")}
                                       onChange={e => setPayType(e.target.defaultValue)}
                                       label={<img
                                           width={80}
                                           className={"rounded-full"}
                                           src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                                           alt="naqd"/>} crossOrigin={undefined}
                                />
                                <Radio name={"pay-type"}
                                       value={"terminal"} onClick={() => setArrayToggle("terminal")}
                                       onChange={e => setPayType(e.target.defaultValue)}
                                       label={<img
                                           width={80}
                                           src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                                           alt="terminal"/>} crossOrigin={undefined}
                                />
                                <Radio name={"pay-type"}
                                       value={"mixed-pay"}
                                       onClick={() => toggleMixed(true)}
                                       onChange={e => {
                                           setPayType(e.target.defaultValue)
                                           dispatch(setMixedPayList([]))
                                           toggleMixed(true)
                                       }}
                                       label={<img
                                           width={90}
                                           className={"rounded-full"}
                                           src="https://www.pngitem.com/pimgs/m/509-5093697_payment-png-transparent-png.png"
                                           alt="terminal"/>} crossOrigin={undefined}
                                />
                            </div>
                            <div className="my-3">
                                <InputComponent.Textarea
                                    name={"commit"}
                                    placeholder={"Sotuv uchun izoh qoldirish"}
                                    label={"Izoh"}/>
                                {/*<Textarea label="Izoh qoldirish" value={commit}*/}
                                {/*          onChange={e => setCommit(e.target.value)}/>*/}
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="flex justify-between border-b border-dashed py-3">
                                <Typography variant={"small"} className={"font-bold text-base"}>Jami
                                    (chegirma): </Typography>
                                <Typography variant={"small"}
                                            className={"font-bold text-base"}>{formatter.format(totalAfterDiscount)}</Typography>
                            </div>
                            <div className="">
                                <ul>
                                    <li className={"w-full flex items-center justify-between my-2"}>
                                        <Typography variant={"small"} className={"font-bold text-sm"}>Umumiy
                                            narx: </Typography>
                                        <Typography variant={"small"} className={"font-bold text-sm"}>{formatter.format(totalPrice)}</Typography>
                                    </li>
                                    {baskets.map((item, ind) => (
                                        <li key={ind} className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>{ind + 1} -
                                                mahsulotdan
                                                chegirma: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>{formatter.format(Number(item?.discount) || 0)}</Typography>
                                        </li>))}
                                    <li className={"w-full flex items-center justify-between my-2"}>
                                        <Typography variant={"small"} className={"font-bold text-sm"}>To'lov
                                            turi: </Typography>
                                        <Typography variant={"small"}
                                                    className={"font-bold text-sm"}>{handleSwitchPayType(payType)}</Typography>
                                    </li>
                                    {
                                        payType === "debt-pay" && <>
                                            <li className={"w-full flex items-center justify-between my-2"}>
                                                <Typography variant={"small"} className={"font-bold text-sm"}>Qarzdor
                                                    F.I.O: </Typography>
                                                <Typography variant={"small"}
                                                            className={"font-bold text-sm flex items-center"}>{client?.clientName}<BiEdit
                                                    className={"ml-1 text-lg text-green-500 cursor-pointer"}
                                                    onClick={toggleDebt}/></Typography>
                                            </li>
                                            <li className={"w-full flex items-center justify-between my-2"}>
                                                <Typography variant={"small"} className={"font-bold text-sm"}>Telefon
                                                    raqami: </Typography>
                                                <Typography variant={"small"}
                                                            className={"font-bold text-sm"}>{client?.clientPhone}</Typography>
                                            </li>
                                            <li className={"w-full flex items-center justify-between my-2"}>
                                                <Typography variant={"small"} className={"font-bold text-sm"}>Qaytarish
                                                    sanasi: </Typography>
                                                <Typography variant={"small"}
                                                            className={"font-bold text-sm"}><DateFormatComponent
                                                    currentDate={client?.clientPaymentDate}/></Typography>
                                            </li>
                                        </>
                                    }
                                    {
                                        mixedPay && <div className={"flex flex-col w-full"}>
                                            <div className={"w-full flex justify-between items-center"}>
                                                <div className={"text-sm font-bold w-1/12"}>№</div>
                                                <div className={"text-sm font-bold w-7/12"}>To'lov summasi</div>
                                                <div className={"text-sm font-bold w-5/12"}>To'lov turi</div>
                                            </div>

                                            {
                                                mixedPay.map((item, ind) => <div
                                                    className={"w-full flex justify-between py-1 border-b"} key={ind}>
                                                    <div className={"text-sm w-1/12`"}>{ind + 1}</div>
                                                    <div className={"text-sm pl-5 w-7/12"}>{formatter.format(item.paymentAmount)}</div>
                                                    <div
                                                        className={"text-sm w-4/12"}>{handleSwitchPayType(item.paymentType)}</div>
                                                </div>)
                                            }
                                        </div>
                                    }
                                    <li className={"w-full flex justify-center mt-5"}>
                                        <Button className={"normal-case"} type={"submit"} color={"green"}
                                                disabled={baskets.length === 0}>
                                            Buyurtmani aktivlashtirish
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </form>
            {isDebt && <DebtorSidebar open={isDebt} toggle={toggleDebt} totalPrice={totalAfterDiscount}/>}
            {isMixed &&
                <MixedPaySidebar open={isMixed} toggle={() => setMixed(!isMixed)} totalPrice={totalAfterDiscount}/>}
        </div>
    );
}