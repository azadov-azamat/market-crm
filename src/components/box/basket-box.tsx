import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";
import {handleNumberMask} from "../../config/servise.ts";
import {BasketsDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {incrementBasket, removeBasket, setBasket, setDiscountBasket} from "../../redux/reducers/variable.ts";
import * as InputComponent from "../inputs";
// import React from "react";

export default function BasketBox(props: BasketsDataProps) {

    const {name, src, id, price, measure, count} = props

    const dispatch = useAppDispatch()
    const {baskets} = useAppSelector(state => state.variables)

    const currentAmount = baskets[baskets.findIndex(item => item.id === id)]?.amount;
    const currentDiscount = baskets[baskets.findIndex(item => item.id === id)]?.discount || 0;

    const increment = (text: string) => {
        if (baskets.find(item => item.id === id)) {
            if (Number(text) > count) {
                toast.error(`Xozirda ${count + measure} mahsulot mavjud`)
            } else {
                dispatch(incrementBasket({id, amount: text}))
            }
        } else {
            dispatch(setBasket({...props, amount: '1'}))
        }
    }

    return (
        <Card shadow color={"white"} className={"border"}>
            <CardBody className={"flex justify-start"}>
                <div className="w-4/12 xl:w-2/12 xl:h-36 sm:h-40 h-36">
                    <LazyLoadImage effect={"black-and-white"}
                                   className={"object-cover object-center xl:h-36 sm:h-40 h-36"} alt={name}
                                   src={src}
                    />
                </div>
                <div className="w-8/12 xl:w-4/12 flex flex-col pl-3">
                    <Typography variant={"h2"}
                                className={"font-bold text-base"}>
                        {name}
                    </Typography>
                    <Typography variant={"small"} className={"font-medium text-base"}>
                        Miqdori: {count} {measure}
                    </Typography>
                    <div
                        className="flex h-full items-center xl:items-end justify-between xl:justify-start mt-3 xl:mt-0">
                        <div
                            className={"w-6/12 h-8 flex xl:hidden justify-between items-center"}>
                            <InputComponent.Text value={currentAmount}
                                                 name={"amount"}
                                                 placeholder={"Miqdorini kiriting"}
                                                 onChange={(e: {
                                                     target: { value: string; };
                                                 }) => increment(handleNumberMask(e.target.value))}
                                                 label={"Miqdorini kiriting"}/>
                            {/*<Input*/}
                            {/*    label={"Miqdor kiriting"}*/}
                            {/*    value={currentAmount}*/}
                            {/*    crossOrigin={undefined}*/}
                            {/*    onChange={(e) => increment(handleNumberMask(e.target.value))}*/}
                            {/*/>*/}
                        </div>
                        <div className="z-10">
                            <Button color={'red'} className={"p-3"} onClick={() => dispatch(removeBasket(id))}>
                                <FaTrash/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="hidden w-4/12 h-full xl:flex xl:flex-col gap-3 justify-center">
                    <div className="flex w-full items-center gap-3">
                        <div
                            className={"w-8/12 h-8 flex justify-between mb-6"}>
                            <InputComponent.Text value={currentAmount}
                                                 name={"amount"}
                                                 placeholder={"Miqdorini kiriting"}
                                                 onChange={(e: {
                                                     target: { value: string; };
                                                 }) => increment(handleNumberMask(e.target.value))}
                                                 label={"Miqdorini kiriting"}/>
                        </div>
                        <div className="">
                            <Typography variant={"h2"}
                                        className={"font-bold text-base"}>
                                {currentAmount !== "0" ? `${(price - currentDiscount) * Number(currentAmount)} sum` : price + " sum"}
                            </Typography>
                        </div>
                    </div>
                    <div className="">
                        <InputComponent.Text value={currentDiscount}
                                             disabled={!baskets.find(item => item.id === Number(id))}
                                             name={"discount-item"}
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
                            className={"font-bold text-base"}>
                    {currentAmount !== "0" ? `${(price - currentDiscount) * Number(currentAmount)} sum` : price + " sum"}
                </Typography>
            </div>
        </Card>
    );
}