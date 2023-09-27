import BasketBox from "../../components/box/basket-box.tsx";
import {Button, Card, CardBody, Radio, Textarea, Typography} from "@material-tailwind/react";
import React from "react";
import {handleSwitchPayType} from "../../config/servise.ts";
import {BiEdit} from "react-icons/bi";
import {useAppSelector} from "../../redux/hooks.ts";
import {DebtorModal} from "./debtor-modal.tsx";

export default function Basket() {

    const {baskets, debtor} = useAppSelector(state => state.variables)

    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = React.useState<number>(0)
    const [payType, setPayType] = React.useState<string>("")
    const [isDebt, setDebt] = React.useState<boolean>(false)
    const toggleDebt = () => setDebt(!isDebt)

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
                                   value={'click-pay'}
                                   defaultChecked
                                   label={<img
                                       width={80}
                                       src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                                       alt="click-pay"/>} crossOrigin={undefined}
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
                                   value={"cash-pay"}
                                   onChange={e => setPayType(e.target.defaultValue)}
                                   label={<img
                                       width={80}
                                       className={"rounded-full"}
                                       src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                                       alt="cash-pay"/>} crossOrigin={undefined}
                            />
                            <Radio name={"pay-type"}
                                   value={"terminal-pay"}
                                   onChange={e => setPayType(e.target.defaultValue)}
                                   label={<img
                                       width={80}
                                       src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                                       alt="terminal-pay"/>} crossOrigin={undefined}
                            />
                        </div>
                        <div className="mt-3">
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
                                                        className={"font-bold text-sm flex items-center"}>{debtor?.name}<BiEdit className={"ml-1 text-lg text-green-500 cursor-pointer"}
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
            <DebtorModal isOpen={isDebt} toggle={toggleDebt} totalPrice={totalAfterDiscount}/>
        </div>
    );
}