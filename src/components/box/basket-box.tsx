import React from 'react';
import {Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";
import {handleNumberMask} from "../../config/servise.ts";

interface ProductBoxProps {
    text: string;
    img: string;
    price: number;
    measure: string;
    count: number;
}

export default function BasketBox(props: ProductBoxProps) {

    const {text, img, price, measure, count} = props
    const [basketCount, setBasketCount] = React.useState<number>(1)
    const [discount, setDiscount] = React.useState<number>(0)

    const increment = () => {
        if (basketCount >= count) {
            toast.error(`Xozirda ${count + measure} mahsulot mavjud`)
        } else {
            setBasketCount(basketCount + 1)
        }
    }
    const decrement = () => {
        setBasketCount(basketCount <= 1 ? 1 : basketCount - 1)
    }

    return (
        <Card shadow color={"white"} className={"border"}>
            <CardBody className={"flex justify-start"}>
                <div className="w-4/12 xl:w-2/12 xl:h-36 sm:h-40 h-36">
                    <LazyLoadImage effect={"black-and-white"}
                                   className={"object-cover object-center xl:h-36 sm:h-40 h-36"} alt={text}
                                   src={img}
                    />
                </div>
                <div className="w-8/12 xl:w-4/12 flex flex-col pl-3">
                    <Typography variant={"h2"}
                                className={"font-bold text-base"}>
                        {text}
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base"}>
                        Miqdori: {count} {measure}
                    </Typography>
                    <div
                        className="flex h-full items-center xl:items-end justify-between xl:justify-start mt-3 xl:mt-0">
                        <div
                            className={"w-6/12 h-8 rounded-lg border border-black flex xl:hidden justify-between items-center select-none"}>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={decrement}>-</Typography>
                            <Typography variant={"small"}>{basketCount}</Typography>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={increment}>+</Typography>
                        </div>
                        <Button color={'red'}>
                            <FaTrash/>
                        </Button>
                    </div>
                </div>
                <div className="hidden w-4/12 h-full xl:flex xl:flex-col gap-3 justify-center">
                    <div className="flex w-full items-center gap-3">
                        <div
                            className={"w-6/12 h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={decrement}>-</Typography>
                            <Typography variant={"small"}>{basketCount}</Typography>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={increment}>+</Typography>
                        </div>
                        <div className="">
                            <Typography variant={"h2"}
                                        className={"font-bold text-base"}>
                                {basketCount !== 0 ? ((price - discount) * basketCount) + " sum" : price}
                            </Typography>
                        </div>
                    </div>
                    <div className="">
                        <Input
                            label={"Chegirma qilasizmi?"}
                            value={discount}
                            onChange={e => setDiscount(handleNumberMask(e.target.value))}
                            crossOrigin={undefined}/>
                    </div>
                </div>
            </CardBody>
            <div className="w-full flex justify-between items-center xl:hidden px-6 py-2">
                <div className="">
                    <Input
                        label={"Chegirma qilasizmi?"}
                        value={discount}
                        onChange={e => setDiscount(handleNumberMask(e.target.value))}
                        crossOrigin={undefined}/>
                </div>
                <Typography variant={"h2"}
                            className={"font-bold text-base"}>
                    {basketCount !== 0 ? ((price - discount) * basketCount) + " sum" : price}
                </Typography>
            </div>
        </Card>
    );
}