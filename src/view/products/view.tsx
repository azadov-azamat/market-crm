import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ProductsDataProps} from "../../interface/redux/variable.interface.ts";
import {incrementBasket, setBasket, setDiscountBasket} from "../../redux/reducers/variable.ts";
import {handleNumberMask} from "../../config/servise.ts";
import {toast} from "react-toastify";
import ProductList from "./list.tsx";
import {SlBasket} from "react-icons/sl";
import {LuShoppingBasket} from "react-icons/lu";
import * as InputComponent from "../../components/inputs";
// import React from "react";

export default function ViewProduct() {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {products, baskets} = useAppSelector(state => state.variables)

    const currentProduct: ProductsDataProps | null = products.find(item => item.id === Number(id)) || null
    const currentAmount = baskets[baskets.findIndex(item => item.id === Number(id))]?.amount || "0";
    const currentDiscount = baskets[baskets.findIndex(item => item.id === Number(id))]?.discount || 0;

    const increment = (text: string) => {
        if (currentProduct !== null) {
            if (baskets.find(item => item.id === Number(id))) {
                if (Number(text) > currentProduct?.productQuantity) {
                    toast.error(`Xozirda ${currentProduct?.productQuantity + currentProduct?.productMeasure} mahsulot mavjud`)
                } else {
                    dispatch(incrementBasket({id, amount: text}))
                }
            } else {
                dispatch(setBasket({...currentProduct, amount: "1"}))
            }
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-5 justify-between">
                <Card shadow color={"white"} className={"border w-full md:w-6/12"}>
                    <CardBody className={"flex justify-start"}>
                        <div className="w-4/12 xl:h-36 sm:h-40 h-36">
                            <LazyLoadImage effect={"black-and-white"}
                                           className={"object-cover object-center xl:h-36 sm:h-40 h-36"}
                                           alt={currentProduct?.productName}
                                           src={typeof currentProduct?.productImgUrl === "object" ? URL.createObjectURL(Object(currentProduct?.productImgUrl)) : currentProduct?.productImgUrl}
                            />
                        </div>
                        <div className="w-8/12 flex flex-col pl-3">
                            <Typography variant={"h2"}
                                        className={"font-bold text-base"}>
                                {currentProduct?.productName}
                            </Typography>
                            <Typography variant={"small"} className={"font-medium text-base"}>
                                Miqdori: {currentProduct?.productQuantity} {currentProduct?.productMeasure}
                            </Typography>
                            <div
                                className="flex h-full items-center xl:items-end justify-between xl:justify-start mt-3 xl:mt-0">
                                <div
                                    className={"w-6/12 h-8 flex "}>
                                    <InputComponent.Text value={currentAmount}
                                                         name={"amount-item"}
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
                            </div>
                        </div>
                        <div className="hidden w-4/12 h-full xl:hidden xl:flex-col gap-3 justify-center">
                            <div className="flex w-full items-center gap-3">
                                <div
                                    className={"w-6/12 h-8 flex "}>
                                    <InputComponent.Text value={currentAmount}
                                                         name={"amount-item"}
                                                         placeholder={"Miqdorini kiriting"}
                                                         onChange={(e: {
                                                             target: { value: string; };
                                                         }) => increment(handleNumberMask(e.target.value))}
                                                         label={"Miqdorini kiriting"}/>
                                </div>
                                <div className="">
                                    <Typography variant={"h2"}
                                                className={"font-bold text-base"}>
                                        {currentProduct !== null && currentAmount !== "0" ? `${(currentProduct?.productPrice - currentDiscount) * Number(currentAmount)} sum` : currentProduct?.productPrice + " sum"}
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
                    <div className="w-full flex justify-between items-center  px-6 py-2">
                        <div className="">
                            <InputComponent.Text value={currentDiscount}
                                                 name={"discount-item"}
                                                 disabled={!baskets.find(item => item.id === Number(id))}
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
                            {currentProduct !== null && currentAmount !== "0" ? `${(currentProduct?.productPrice - currentDiscount) * Number(currentAmount)} sum` : currentProduct?.productPrice + " sum"}
                        </Typography>
                    </div>
                </Card>
                <Card shadow color={"white"} className={"border w-full md:w-3/12"}>
                    <CardBody className={"flex flex-col"}>
                        <div className="w-full mb-3 py-2 border-b border-dashed">
                            <Typography variant={"h2"}
                                        className={"font-bold text-xl"}>
                                {currentProduct?.productPrice} sum
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-2 mt-12">
                            <Button className={"w-full flex justify-center items-center gap-2"}
                                    disabled={currentProduct?.productQuantity === 0} color={"blue"}
                                    onClick={() => {
                                        increment("1")
                                        navigate("/seller/baskets")
                                    }}>
                                <LuShoppingBasket className={'text-lg'}/>
                                <Typography variant={"small"} className={"normal-case text-xs "}>
                                    Bittada sotib olish
                                </Typography>
                            </Button>
                            <Button onClick={() => increment("1")}
                                    className={"flex justify-center items-center  gap-2"}
                                    disabled={currentProduct?.productQuantity === 0}
                                    color={'light-green'}><SlBasket
                                className={'text-lg'}/> Korzinkaga qo'shish</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="w-full text-center my-5">
                <Typography variant={"h2"}
                            className={"font-bold text-lg"}>
                    Boshqa mahsulotlar
                </Typography>
            </div>
            <ProductList/>
        </div>
    );
}