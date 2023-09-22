// import React from 'react';

import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useNavigate} from "react-router-dom";
import {SlBasket} from "react-icons/sl";
import React from "react";
import {toast} from "react-toastify";

interface ProductBoxProps {
    text: string;
    img: string;
    id: number;
    price: number;
    measure: string;
    count: number;
}

export default function ProductBox(props: ProductBoxProps) {
    const {text, img, id, price, measure, count} = props
    const navigate = useNavigate()
    const [isBasket, setBasket] = React.useState<boolean>(false)
    const [basketCount, setBasketCount] = React.useState<number>(0)

    const increment = () => {
        if (basketCount >= count) {
            toast.error(`Xozirda ${count + measure} mahsulot mavjud`)
        } else {
            setBasketCount(basketCount + 1)
        }
    }
    const decrement = () => {
        setBasketCount(basketCount <= 0 ? 0 : basketCount - 1)
        if ((basketCount - 1) < 1) setBasket(false)
    }


    return (
        <Card shadow color={"white"} className={`relative w-full md:h-96  h-auto ${count === 0 && 'opacity-40'}`}
              onClick={() => navigate(`/seller/products/${id}`)}>
            <CardBody className={"w-full h-full flex flex-col justify-between py-2 px-2"}>
                <div className="">
                    <div className="w-full md:h-36 sm:h-40 h-36 flex justify-center">
                        <LazyLoadImage effect={"black-and-white"}
                                       className={"object-cover object-center md:h-36 sm:h-40 h-36"} alt={text}
                                       src={img}
                        />
                    </div>
                    <div className="mt-3">
                        <Typography variant={"small"}
                                    className={"h-10 overflow-ellipsis font-medium text-xs leading-6"}>
                            {text}
                        </Typography>
                    </div>
                </div>
                <div className="my-3 sm:my-0">
                    <Typography variant={"small"} className={"font-bold text-lg"}>
                        {price} sum
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base"}>
                        Miqdori: {count} {measure}
                    </Typography>
                </div>
                <div className="w-full flex md:flex-row flex-col gap-2">
                    {
                        isBasket ? <div
                            className={"w-full h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={decrement}>-</Typography>
                            <Typography variant={"small"}>{basketCount}</Typography>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={increment}>+</Typography>
                        </div> : <>
                            <Button className={"py-1.5 md:w-9/12"} disabled={count === 0} color={"blue"}>
                                <Typography variant={"small"} className={"normal-case text-xs"}>
                                    Bittada sotib olish
                                </Typography>
                            </Button>
                            <Button onClick={() => {
                                increment()
                                setBasket(true)
                            }}
                                    className={"flex justify-center items-center py-1.5"}
                                    disabled={count === 0}
                                    color={'light-green'}><SlBasket
                                className={'text-lg'}/></Button>
                        </>
                    }
                </div>
            </CardBody>
        </Card>
    );
}