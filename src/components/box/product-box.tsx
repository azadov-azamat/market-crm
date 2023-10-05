import React from "react";

import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useNavigate} from "react-router-dom";
import {SlBasket} from "react-icons/sl";
import {toast} from "react-toastify";
import {ProductsDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {incrementBasket, removeBasket, setBasket} from "../../redux/reducers/variable.ts";
import {handleNumberMask} from "../../config/servise.ts";
import {BiXCircle} from "react-icons/bi";
import * as InputComponent from "../inputs";

export default function ProductBox(props: ProductsDataProps) {
    const {productName, productImgUrl, productPrice, productMeasure, productQuantity, id, productModel, productOption} = props

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {baskets} = useAppSelector(state => state.variables)

    const [isBasket, setIsBasket] = React.useState<boolean>(false)

    const currentAmount = baskets[baskets.findIndex(item => item.id === id)]?.amount;

    React.useEffect(() => {
        if (baskets.find(item => item.id === id)) setIsBasket(true)
    }, [baskets])

    const increment = (text: string) => {
        if (baskets.find(item => item.id === id)) {
            if (Number(text) > productQuantity) {
                toast.error(`Xozirda ${productQuantity + productMeasure} mahsulot mavjud`)
            } else {
                dispatch(incrementBasket({id, amount: text}))
            }
        } else {
            dispatch(setBasket({...props, amount: '1'}))
        }
    }

    return (
        <Card shadow color={"white"} className={`relative w-full md:h-96  h-auto ${productQuantity === 0 && 'opacity-40'}`}>
            <div className="w-full flex justify-end">
                {isBasket && <BiXCircle onClick={() => {
                    dispatch(removeBasket(Number(id)))
                    setIsBasket(false)
                }} className={"text-2xl absolute -top-2 -right-2 text-red-500 cursor-pointer"}/>}
            </div>
            <CardBody className={"w-full h-full flex flex-col justify-between py-2 px-2 pb-3"}>
                <div className="">
                    <div className="w-full md:h-36 sm:h-40 h-36 flex justify-center">
                        <LazyLoadImage effect={"black-and-white"}
                                       className={"object-cover object-center md:h-36 sm:h-40 h-36"} alt={productName}
                                       src={productImgUrl}
                                       // src={"https://w7.pngwing.com/pngs/1008/303/png-transparent-shopping-cart-icon-product-return-shopping-cart-retail-supermarket-objects.png"}
                        />

                    </div>
                    <div className="mt-3">
                        <Typography variant={"paragraph"} onClick={() => navigate(`/seller/product/${id}`)}
                                    className={"h-10 overflow-ellipsis font-bold text-xs leading-6 cursor-pointer hover:underline"}>
                            {productName}
                        </Typography>
                        <Typography variant={"small"}
                                    className={"der overflow-ellipsis font-medium text-xs"}>
                            {productModel}
                        </Typography>
                        <Typography variant={"small"}
                                    className={"der overflow-ellipsis font-medium text-xs"}>
                            {productOption}
                        </Typography>
                    </div>
                </div>
                <div className="my-3 sm:my-0">
                    <Typography variant={"small"} className={"font-bold text-lg"}>
                        {productPrice} sum
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base"}>
                        Miqdori: {productQuantity} {productMeasure}
                    </Typography>
                </div>
                <div className="w-full flex md:flex-row flex-col gap-2">
                    {
                        isBasket ? <div
                            className={"w-full h-8 rounded-lg flex mb-2"}>
                            <InputComponent.Text value={currentAmount}
                                                 name={"amount"}
                                                 placeholder={"Miqdorini kiriting"}
                                                 onChange={(e: {
                                                     target: { value: string; };
                                                 }) => increment(handleNumberMask(e.target.value))}
                                                 label={""}/>
                        </div> : <>
                            <Button className={"py-1.5 md:w-9/12"} disabled={productQuantity === 0} color={"blue"}
                                    onClick={() => {
                                        increment("1")
                                        navigate("/seller/baskets")
                                    }}>
                                <Typography variant={"small"} className={"normal-case text-xs"}>
                                    Bittada sotib olish
                                </Typography>
                            </Button>
                            <Button onClick={() => {
                                increment("1")
                                setIsBasket(true)
                            }}
                                    className={"flex justify-center items-center py-1.5"}
                                    disabled={productQuantity === 0}
                                    color={'light-green'}><SlBasket
                                className={'text-lg'}/></Button>
                        </>
                    }
                </div>
            </CardBody>
        </Card>
    );
}