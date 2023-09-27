import BasketBox from "../../components/box/basket-box.tsx";
import {Button, Card, CardBody, Input, Radio, Textarea, Typography} from "@material-tailwind/react";
import React from "react";
import {handleNumberMask, handleSwitchPayType} from "../../config/servise.ts";
import {BiEdit} from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {DebtorSidebar} from "./debtor-sidebar.tsx";
import {MixedPaySidebar} from "./mixed-pay-sidebar.tsx";
import {setMixedPayList} from "../../redux/reducers/variable.ts";

export default function Basket() {

    const dispatch = useAppDispatch()
    const {baskets, debtor, mixedPay} = useAppSelector(state => state.variables)

    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    const [transferSum, setTransferSum] = React.useState<number>(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = React.useState<number>(0)
    const [payType, setPayType] = React.useState<string>("")
    const [isDebt, setDebt] = React.useState<boolean>(false)
    const [isMixed, setMixed] = React.useState<boolean>(false)
    const toggleDebt = () => setDebt(!isDebt)
    const toggleMixed = () => setMixed(!isMixed)

    React.useEffect(() => {
        let totalAmount = 0;
        let discountAmount = 0;
        for (const basket of baskets) {
            totalAmount += (basket.price * Number(basket.amount))
            discountAmount += (basket.price - (basket.discount || 0)) * Number(basket.amount)
        }
        setTotalPrice(totalAmount)
        setTotalAfterDiscount(discountAmount)
    }, [baskets])

    React.useEffect(() => {
        return () => {
            dispatch(setMixedPayList([]))
        }
    }, [])

    return (
        <div className={"flex flex-col md:flex-row w-full h-auto gap-5"}>
            <div className="w-full xl:w-7/12 flex flex-col gap-5">
                {
                    baskets.map(({name, amount, src, price, measure, count, id}, ind) => (
                        <BasketBox
                            key={ind}
                            amount={amount}
                            name={name}
                            src={src}
                            price={price}
                            measure={measure}
                            count={count}
                            id={id}
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
                                       toggleDebt()
                                   }}
                                   label={<img
                                       width={80}
                                       src="https://ipakyulibank.uz/uploads/images/widget/2022/09/widget_1662981431_3135.png"
                                       alt="debt-pay"/>} crossOrigin={undefined}
                            />
                            <Radio name={"pay-type"}
                                   value={"naqd"}
                                   onChange={e => setPayType(e.target.defaultValue)}
                                   label={<img
                                       width={80}
                                       className={"rounded-full"}
                                       src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                                       alt="naqd"/>} crossOrigin={undefined}
                            />
                            <Radio name={"pay-type"}
                                   value={"terminal"}
                                   onChange={e => setPayType(e.target.defaultValue)}
                                   label={<img
                                       width={80}
                                       src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                                       alt="terminal"/>} crossOrigin={undefined}
                            />
                            <Radio name={"pay-type"}
                                   value={"mixed-pay"}
                                   onClick={toggleMixed}
                                   onChange={e => {
                                       setPayType(e.target.defaultValue)
                                       toggleMixed()
                                   }}
                                   label={<img
                                       width={90}
                                       className={"rounded-full"}
                                       src="https://www.pngitem.com/pimgs/m/509-5093697_payment-png-transparent-png.png"
                                       alt="terminal"/>} crossOrigin={undefined}
                            />
                        </div>
                        <div className="my-3">
                            {payType !== "debt-pay" && payType !== "mixed-pay" ? <Input
                                name={"paymentAmount"}
                                label={"O'tkazilgan summa"}
                                value={transferSum}
                                onChange={e => setTransferSum(Number(handleNumberMask(e.target.value)))}
                                crossOrigin={undefined}
                            /> : <></>}
                        </div>
                        <div>
                            <Textarea label="Izoh qoldirish"/>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="flex justify-between border-b border-dashed py-3">
                            <Typography variant={"small"} className={"font-bold text-base"}>Jami
                                (chegirma): </Typography>
                            <Typography variant={"small"}
                                        className={"font-bold text-base"}>{totalAfterDiscount} sum</Typography>
                        </div>
                        <div className="">
                            <ul>
                                <li className={"w-full flex items-center justify-between my-2"}>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>Umumiy
                                        narx: </Typography>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>{totalPrice}
                                        sum</Typography>
                                </li>
                                {baskets.map((item, ind) => (
                                    <li className={"w-full flex items-center justify-between my-2"}>
                                        <Typography variant={"small"} className={"font-bold text-sm"}>{ind + 1} -
                                            mahsulotdan
                                            chegirma: </Typography>
                                        <Typography variant={"small"} className={"font-bold text-sm"}>{item?.discount}
                                            sum</Typography>
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
                                                        className={"font-bold text-sm flex items-center"}>{debtor?.name}<BiEdit
                                                className={"ml-1 text-lg text-green-500 cursor-pointer"}
                                                onClick={toggleDebt}/></Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>Telefon
                                                raqami: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>+{debtor?.phoneNumber}</Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>Qaytarish
                                                sanasi: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>{debtor?.expDate}</Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>Berilgan
                                                pul: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>{debtor?.paidSum} sum</Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>To'lov
                                                turi: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>{handleSwitchPayType(debtor?.payType || "")}</Typography>
                                        </li>
                                    </>
                                }
                                {
                                    payType === "mixed-pay" && <div className={"flex flex-col w-full"}>
                                        <div className={"w-full flex justify-between items-center"}>
                                            <div className={"text-sm font-bold w-1/3"}>№</div>
                                            <div className={"text-sm font-bold w-1/3"}>To'lov summasi</div>
                                            <div className={"text-sm font-bold w-1/3"}>To'lov turi</div>
                                        </div>
                                        <div>
                                            {
                                                mixedPay.map((item, ind) => <div
                                                    className={"w-full flex justify-between py-1 border-b"}>
                                                    <div className={"text-sm w-1/3"}>{ind + 1}</div>
                                                    <div className={"text-sm w-1/3"}>{item.paymentAmount} sum</div>
                                                    <div
                                                        className={"text-sm w-1/3"}>{handleSwitchPayType(item.paymentType)}</div>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                }
                                <li className={"w-full flex justify-center mt-5"}>
                                    <Button className={"normal-case"} color={"green"}>
                                        Buyurtmani aktivlashtirish
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <DebtorSidebar open={isDebt} toggle={toggleDebt} totalPrice={totalAfterDiscount}/>
            <MixedPaySidebar open={isMixed} toggle={toggleMixed}/>
        </div>
    );
}