import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";
import {formatter, handleNumberMask, roundMath} from "../../config/servise.ts";
import {BasketsDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {incrementBasket, removeBasket, setBasket, setDiscountBasket} from "../../redux/reducers/variable.ts";
import * as InputComponent from "../inputs";
import {noIMG} from "../../config/api.ts";
// import React from "react";

export default function BasketBox(props: BasketsDataProps) {

    const {productName, productImgUrl, productPrice, productCurrency, productMainPrice, productMeasure, productQuantity, id} = props

    const dispatch = useAppDispatch()
    const {baskets} = useAppSelector(state => state.variables)
    const {nbu} = useAppSelector(state => state.firms)

    const currentAmount = baskets[baskets.findIndex(item => item.id === id)]?.amount;
    const currentDiscount = baskets[baskets.findIndex(item => item.id === id)]?.discount || 0;

     // @ts-ignore
    const dollarCur = parseInt(nbu.find(item => item.Ccy === "USD")?.Rate)
    const afterCurrency = (productCurrency === "dollar" ? (productPrice * dollarCur) : productPrice)

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

    function pieceItemIn() {
        if (baskets.find(item => item.id === id)) {
            if (Number(currentAmount) + 1 > productQuantity) {
                toast.error(`Xozirda ${productQuantity + productMeasure} mahsulot mavjud`)
            } else {
                dispatch(incrementBasket({id, amount: Number(currentAmount) + 1}))
            }
        } else {
            dispatch(setBasket({...props, amount: "1"}))
        }
    }

    function pieceItemDic() {
        dispatch(incrementBasket({id, amount: Number(currentAmount) - 1}))
        if ((Number(currentAmount) - 1) < 1) dispatch(removeBasket(Number(id)))
    }

    return (
        <Card shadow color={"white"} className={"border"}>
            <CardBody className={"flex justify-start"}>
                <div className="w-4/12 xl:w-2/12 xl:h-36 sm:h-40 h-36">
                    <LazyLoadImage effect={"black-and-white"}
                                   className={"object-cover object-center xl:h-36 sm:h-40 h-36"}
                                   alt={productName}
                                   src={productImgUrl || noIMG}
                    />
                </div>
                <div className="w-8/12 xl:w-4/12 flex flex-col pl-3">
                    <Typography variant={"h2"}
                                className={"font-bold text-base"}>
                        {productName}
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base mt-1"}>
                        Miqdori: {productQuantity} {productMeasure}
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base"}>
                        Narxi: {formatter.format(roundMath(afterCurrency))}
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base"}>
                        Asosiy narxi: {productCurrency === 'dollar' ? formatter.format(roundMath(productMainPrice * dollarCur)) : formatter.format(roundMath(productMainPrice))}
                    </Typography>
                    <div
                        className="flex h-full items-center xl:items-end justify-between xl:justify-start mt-5 xl:mt-0">
                        <div
                            className={"w-9/12 h-8 flex xl:hidden justify-between items-center"}>
                            {productMeasure !== 'dona' ? <InputComponent.Text value={currentAmount}
                                                                              name={"amount"}
                                                                              placeholder={"Miqdorini kiriting"}
                                                                              onChange={(e: {
                                                                                  target: { value: string; };
                                                                              }) => increment(handleNumberMask(e.target.value))}
                                                                              label={""}/> : <div   className={"w-full h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                                <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                            onClick={pieceItemDic}>-</Typography>
                                <Typography
                                    variant={"small"}>{currentAmount}</Typography>
                                <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                            onClick={pieceItemIn}>+</Typography>
                            </div>}
                        </div>
                        <div className={productMeasure !== 'dona' ? "mt-4" : "mt-0"}>
                            <Button color={'red'} className={"p-3"} onClick={() => id && dispatch(removeBasket(id))}>
                                <FaTrash/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="hidden w-4/12 h-full xl:flex xl:flex-col gap-3 justify-center">
                    <div className="flex w-full items-center gap-3">
                        <div
                            className={`w-8/12 h-8 flex justify-between ${productMeasure !== 'dona' ? "mb-6" : "mb-0"}`}>
                          {productMeasure !== 'dona' ? <InputComponent.Text value={currentAmount}
                                                                              name={"amount"}
                                                                              placeholder={"Miqdorini kiriting"}
                                                                              onChange={(e: {
                                                                                  target: { value: string; };
                                                                              }) => increment(handleNumberMask(e.target.value))}
                                                                              label={""}/> : <div   className={"w-full h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                                <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                            onClick={pieceItemDic}>-</Typography>
                                <Typography
                                    variant={"small"}>{currentAmount}</Typography>
                                <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                            onClick={pieceItemIn}>+</Typography>
                            </div>}
                        </div>
                        <div className={productMeasure !== 'dona' ? "mt-5" : "mt-0"}>
                            <Typography variant={"h2"}
                                        className={"font-bold text-base"}>
                                {formatter.format(currentAmount !== "0" ?
                                             (afterCurrency - currentDiscount) * Number(currentAmount) : afterCurrency)}
                            </Typography>
                        </div>
                    </div>
                    <div className="">
                        <InputComponent.Text value={currentDiscount}
                                             disabled={!baskets.find(item => item.id === Number(id))}
                                             name={"discount-item"}
                                             maxLength={productPrice.toString().length}
                                             placeholder={"Chegirma qilasizmi?"}
                                             onChange={(e: {
                                                 target: { value: string; };
                                             }) => dispatch(setDiscountBasket({
                                                 id,
                                                 discount: Number(handleNumberMask(e.target.value))
                                             }))}
                                             label={"Chegirma qilasizmi?"}/>
                    </div>
                </div>
            </CardBody>
            <div className="w-full flex justify-between items-center xl:hidden px-6 py-2">
                <div className="w-2/3">
                    <InputComponent.Text value={currentDiscount}
                                         disabled={!baskets.find(item => item.id === Number(id))}
                                         name={"discount-item"}
                                         maxLength={(productPrice * dollarCur).toString().length}
                                         placeholder={"Chegirma qilasizmi?"}
                                         onChange={(e: {
                                             target: { value: string; };
                                         }) => dispatch(setDiscountBasket({
                                             id,
                                             discount: Number(handleNumberMask(e.target.value))
                                         }))}
                                         label={"Chegirma qilasizmi?"}/>
                </div>
                <Typography variant={"h2"}
                            className={"font-bold text-base mt-4"}>
                    {formatter.format(currentAmount !== "0" ? (afterCurrency - currentDiscount) * Number(currentAmount) : afterCurrency)}
                </Typography>
            </div>
        </Card>
    );
}