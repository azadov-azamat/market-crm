import BasketBox from "../../components/box/basket-box.tsx";
import {Card, CardBody, Radio, Typography} from "@material-tailwind/react";
import React from "react";
import {handleSwitchPayType} from "../../config/servise.ts";

export default function Basket() {

    const [payType, setPayType] = React.useState<string>("")

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
                                   label={<img
                                       width={80}
                                       src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                                       alt="click-pay"/>} crossOrigin={undefined}
                            />
                            <Radio name={"pay-type"}
                                   value={"debt-pay"}
                                   onChange={e => setPayType(e.target.defaultValue)}
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
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="flex justify-between border-b border-dashed py-3">
                            <Typography variant={"small"} className={"font-bold text-base"}>Jami (chegirma): </Typography>
                            <Typography variant={"small"} className={"font-bold text-base"}>700 000 sum</Typography>
                        </div>
                        <div className="">
                            <ul>
                                <li className={"w-full flex items-center justify-between my-2"}>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>Umumiy narx: </Typography>
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
                                    <Typography variant={"small"} className={"font-bold text-sm"}>To'lov turi: </Typography>
                                    <Typography variant={"small"} className={"font-bold text-sm"}>{handleSwitchPayType(payType)}</Typography>
                                </li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}