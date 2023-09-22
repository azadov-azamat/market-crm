import React from "react";

import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useNavigate} from "react-router-dom";
import {SlBasket} from "react-icons/sl";
import {toast} from "react-toastify";
import {ProductsDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {decrementBasket, incrementBasket, setBasket} from "../../redux/reducers/variable.ts";

export default function ProductBox(props: ProductsDataProps) {
    const {name, src, price, measure, count, id} = props

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {baskets} = useAppSelector(state => state.variables)

    const [isBasket, setIsBasket] = React.useState<boolean>(false)

    const currentAmount = baskets[baskets.findIndex(item => item.id === id)]?.amount;

    React.useEffect(() => {
        if (baskets.find(item => item.id === id)) setIsBasket(true)
    }, [baskets])

    const increment = () => {
        if (baskets.find(item => item.id === id)) {
            if (currentAmount >= count) {
                toast.error(`Xozirda ${count + measure} mahsulot mavjud`)
            } else {
                dispatch(incrementBasket(id))
            }
        } else {
            dispatch(setBasket({...props, amount: 1}))
        }
    }

    const decrement = () => {
        dispatch(decrementBasket(id))
        if ((currentAmount - 1) < 1) setIsBasket(false)
    }

    return (
        <Card shadow color={"white"} className={`relative w-full md:h-96  h-auto ${count === 0 && 'opacity-40'}`}>
            <CardBody className={"w-full h-full flex flex-col justify-between py-2 px-2"}>
                <div className="">
                    <div className="w-full md:h-36 sm:h-40 h-36 flex justify-center">
                        <LazyLoadImage effect={"black-and-white"}
                                       className={"object-cover object-center md:h-36 sm:h-40 h-36"} alt={name}
                                       src={src}
                        />
                    </div>
                    <div className="mt-3">
                        <Typography variant={"small"} onClick={() => navigate(`/seller/product/${id}`)}
                                    className={"h-10 overflow-ellipsis font-medium text-xs leading-6 cursor-pointer hover:underline"}>
                            {name}
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
                            <Typography
                                variant={"small"}>{currentAmount}</Typography>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={increment}>+</Typography>
                        </div> : <>
                            <Button className={"py-1.5 md:w-9/12"} disabled={count === 0} color={"blue"}
                                    onClick={() => navigate("/seller/baskets")}>
                                <Typography variant={"small"} className={"normal-case text-xs"}>
                                    Bittada sotib olish
                                </Typography>
                            </Button>
                            <Button onClick={() => {
                                increment()
                                setIsBasket(true)
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