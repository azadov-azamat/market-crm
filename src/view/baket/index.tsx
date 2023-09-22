import BasketBox from "../../components/box/basket-box.tsx";
import {Button, Card, CardBody, Input, Radio, Textarea, Typography} from "@material-tailwind/react";
import React from "react";
import {handleSwitchPayType} from "../../config/servise.ts";
import SidebarModal from "../../components/modal/sidebar";
import * as InputComponent from "../../components/inputs";
import {BiEdit} from "react-icons/bi";

export default function Basket() {

    const [payType, setPayType] = React.useState<string>("")
    const [isDebt, setDebt] = React.useState<boolean>(false)
    const toggleDebt = () => setDebt(!isDebt)


    const productList = [
        {
            name: "Девид Николлс: Бир кун. Бир муҳаббат тарихи",
            price: 89000,
            count: 33,
            img: "https://assets.asaxiy.uz/product/items/desktop/830f94c696251a0d3f27e1e3d80db2752022060312004999754V1ODsFDnNF.jpg.webp",
            measure: "dona"

        },
        {
            name: "Телевизор Moonx 43S800 Full HD Android TV",
            price: 49000,
            count: 2,
            img: "https://assets.asaxiy.uz/product/items/desktop/eea5369de0178e4d20e2756a7060d41d2023012922310923268UpQzTRhNBA.jpeg.webp",
            measure: "kg"

        }
    ]

    function DeptComponentModal() {
        return (
            <SidebarModal title={"Qarz savdo"} open={isDebt} toggle={toggleDebt}>
                <div className="flex flex-col gap-3">
                    <Input
                        name={"fullname"}
                        label={"Qarzdor F.I.O"}
                        crossOrigin={undefined}
                    />

                    <InputComponent.PhoneNumber/>
                    <Input
                        name={"ex-date"}
                        type={"date"}
                        label={"To'lov qilish sanasi"}
                        crossOrigin={undefined}
                    />

                    <Input
                        name={"total_price"}
                        label={"Umumiy narx"}
                        value={"740 000 sum"}
                        crossOrigin={undefined}
                    />

                    <Input
                        name={"given_price"}
                        label={"Oldin berilgan pul"}
                        value={"300 000 sum"}
                        crossOrigin={undefined}
                    />
                    <Input
                        name={"paid_price"}
                        label={"Beriladigan pul"}
                        crossOrigin={undefined}
                    />
                    <div className="">
                        <Radio name={"debt-pay-type"}
                               value={'click-pay'}
                               defaultChecked
                               label={<img
                                   width={50}
                                   src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                                   alt="click-pay"/>} crossOrigin={undefined}
                        />
                        <Radio name={"debt-pay-type"}
                               value={"cash-pay"}
                               label={<img
                                   width={50}
                                   className={"rounded-full"}
                                   src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                                   alt="cash-pay"/>} crossOrigin={undefined}
                        />
                        <Radio name={"debt-pay-type"}
                               value={"terminal-pay"}
                               label={<img
                                   width={50}
                                   src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                                   alt="terminal-pay"/>} crossOrigin={undefined}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <Button onClick={toggleDebt} color={"red"}>Bekor qilish</Button>
                        <Button onClick={toggleDebt} color={"orange"}>Saqlash</Button>
                    </div>
                </div>
            </SidebarModal>
        )
    }

    return (
        <div className={"flex flex-col md:flex-row w-full h-auto gap-5"}>
            <div className="w-full xl:w-7/12 flex flex-col gap-5">
                {
                    productList.map(({name, img, price, measure, count}, ind) => (
                        <BasketBox
                            key={ind}
                            text={name}
                            img={img}
                            price={price}
                            measure={measure}
                            count={count}
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
                            <Typography variant={"small"} className={"font-bold text-base"}>700 000 sum</Typography>
                        </div>
                        <div className="">
                            <ul>
                                <li className={"w-full flex items-center justify-between my-2"}>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>Umumiy
                                        narx: </Typography>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>740 000
                                        sum</Typography>
                                </li>
                                <li className={"w-full flex items-center justify-between my-2"}>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>1 - mahsulotdan
                                        chegirma: </Typography>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>30 000
                                        sum</Typography>
                                </li>
                                <li className={"w-full flex items-center justify-between my-2"}>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>2 - mahsulotdan
                                        chegirma: </Typography>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>10 000
                                        sum</Typography>
                                </li>
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
                                                        className={"font-bold text-sm flex items-center"}>Jamshid Kalandarov <BiEdit className={"ml-1 text-lg text-green-500 cursor-pointer"} onClick={toggleDebt}/></Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>Telefon
                                                raqami: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>+998 97 507 70 61</Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>Qaytarish
                                                sanasi: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>21.12.2023</Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>Berilgan
                                                pul: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>300 000 sum</Typography>
                                        </li>
                                        <li className={"w-full flex items-center justify-between my-2"}>
                                            <Typography variant={"small"} className={"font-bold text-sm"}>To'lov
                                                turi: </Typography>
                                            <Typography variant={"small"}
                                                        className={"font-bold text-sm"}>Online to'lov (Click)</Typography>
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
            <DeptComponentModal/>
        </div>
    );
}