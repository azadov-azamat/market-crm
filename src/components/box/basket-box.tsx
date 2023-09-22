import {Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";
import {handleNumberMask} from "../../config/servise.ts";
import {BasketsDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {
    decrementBasket,
    incrementBasket,
    removeBasket,
    setBasket,
    setDiscountBasket
} from "../../redux/reducers/variable.ts";

export default function BasketBox(props: BasketsDataProps) {

    const {name, src, id, price, measure, count} = props

    const dispatch = useAppDispatch()
    const {baskets} = useAppSelector(state => state.variables)

    const currentAmount = baskets[baskets.findIndex(item => item.id === id)]?.amount;
    const currentDiscount = baskets[baskets.findIndex(item => item.id === id)]?.discount || 0;

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
                            className={"w-6/12 h-8 rounded-lg border border-black flex xl:hidden justify-between items-center select-none"}>
                            <Typography variant={"small"}
                                        className={"disabled cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={decrement}>-</Typography>
                            <Typography variant={"small"}>{currentAmount}</Typography>
                            <Typography variant={"small"} className={"cursor-pointer px-2 py-1 rounded text-base"}
                                        onClick={increment}>+</Typography>
                        </div>
                        <Button color={'red'} onClick={() => dispatch(removeBasket(id))}>
                            <FaTrash/>
                        </Button>
                    </div>
                </div>
                <div className="hidden w-4/12 h-full xl:flex xl:flex-col gap-3 justify-center">
                    <div className="flex w-full items-center gap-3">
                        <div
                            className={"w-6/12 h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                            <Typography variant={"small"} color={currentAmount === 1 ? "lime" : "inherit"}
                                        className={`px-2 py-1 ${currentAmount === 1 ? "cursor-not-allowed" : "cursor-pointer"} rounded text-base`}
                                        onClick={() => currentAmount !== 1 ? decrement() : console.log('')}>-</Typography>
                            <Typography variant={"small"}>{currentAmount}</Typography>
                            <Typography variant={"small"} color={currentAmount >= count ? "lime" : "inherit"}
                                        className={`${currentAmount >= count ? "cursor-not-allowed" : "cursor-pointer"} px-2 py-1 rounded text-base`}
                                        onClick={() => currentAmount >= count ? console.log('') : increment()}
                            >+</Typography>
                        </div>
                        <div className="">
                            <Typography variant={"h2"}
                                        className={"font-bold text-base"}>
                                {currentAmount !== 0 ? ((price - currentDiscount) * currentAmount) + " sum" : price}
                            </Typography>
                        </div>
                    </div>
                    <div className="">
                        <Input
                            label={"Chegirma qilasizmi?"}
                            value={currentDiscount}
                            onChange={e => dispatch(setDiscountBasket({
                                id,
                                discount: handleNumberMask(e.target.value)
                            }))}
                            crossOrigin={undefined}/>
                    </div>
                </div>
            </CardBody>
            <div className="w-full flex justify-between items-center xl:hidden px-6 py-2">
                <div className="">
                    <Input
                        label={"Chegirma qilasizmi?"}
                        value={currentDiscount}
                        onChange={e => dispatch(setDiscountBasket({id, discount: handleNumberMask(e.target.value)}))}
                        crossOrigin={undefined}/>
                </div>
                <Typography variant={"h2"}
                            className={"font-bold text-base"}>
                    {currentAmount !== 0 ? ((price - currentDiscount) * currentAmount) + " sum" : price}
                </Typography>
            </div>
        </Card>
    );
}