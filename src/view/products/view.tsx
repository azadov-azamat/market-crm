import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Card, CardBody, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {
    getProductById,
    incrementBasket,
    removeBasket,
    setBasket,
    setDiscountBasket
} from "../../redux/reducers/variable.ts";
import {formatter, handleNumberMask, roundMath} from "../../config/servise.ts";
import {toast} from "react-toastify";
import ProductList from "./list.tsx";
import {SlBasket} from "react-icons/sl";
import {LuShoppingBasket} from "react-icons/lu";
import * as InputComponent from "../../components/inputs";
import React from "react";
import {FaTrash} from "react-icons/fa";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {noIMG} from "../../config/api.ts";
import {BiEdit} from "react-icons/bi";
import EditProduct from "./edit-product.tsx";
import ButtonComponent from "../../components/button";
// import React from "react";

export default function ViewProduct() {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {stores, baskets, product} = useAppSelector(state => state.variables)
    const {nbu} = useAppSelector(state => state.firms)

    const [isBasket, setIsBasket] = React.useState<boolean>(false)
    const [isEdit, setEdit] = React.useState<boolean>(false)

    const currentAmount = baskets[baskets.findIndex(item => item.id === Number(id))]?.amount || 0;
    const currentDiscount = baskets[baskets.findIndex(item => item.id === Number(id))]?.discount || 0;

    const toggleEdit = () => setEdit(!isEdit)

    // @ts-ignore
    const dollarCur = parseInt(nbu.find(item => item.Ccy === "USD")?.Rate)
    const afterCurrency = roundMath((product?.productCurrency === "dollar" ? (product?.productPrice * dollarCur) : product?.productPrice) || 0)
    const afterMainCurrency = roundMath((product?.productCurrency === "dollar" ? (product?.productMainPrice * dollarCur) : product?.productMainPrice) || 0)

    const increment = (text: string) => {
        if (product !== null) {
            if (baskets.find(item => item.id === Number(id))) {
                if (Number(text) > product?.productQuantity) {
                    toast.error(`Xozirda ${product?.productQuantity + product?.productMeasure} mahsulot mavjud`)
                } else {
                    dispatch(incrementBasket({id, amount: text}))
                }
            } else {
                dispatch(setBasket({...product, amount: "1"}))
            }
        }
    }

    function pieceItemIn() {
        if (product !== null) {
            if (baskets.find(item => item.id === Number(id))) {
                if (Number(currentAmount) + 1 > product?.productQuantity) {
                    toast.error(`Xozirda ${product?.productQuantity + product?.productMeasure} mahsulot mavjud`)
                } else {
                    dispatch(incrementBasket({id, amount: Number(currentAmount) + 1}))
                }
            } else {
                dispatch(setBasket({...product, amount: "1"}))
            }
        }
    }

    function pieceItemDic() {
        if ((Number(currentAmount) - 1) < 1) {
            setIsBasket(false)
            dispatch(removeBasket(Number(id)))
        } else {
            dispatch(incrementBasket({id, amount: Number(currentAmount) - 1}))
        }
    }


    React.useEffect(() => {
        if (baskets.find(item => item.id === Number(id))) setIsBasket(true)
        else setIsBasket(false)
    }, [baskets])

    React.useEffect(() => {
        dispatch(getProductById(String(id)))

        return () => {
            dispatch({
                type: "product/getProductById/fulfilled",
                payload: {
                    data: null
                }
            })
        }
    }, [id])

    const breadCumbc: BreadCumbsDataProps[] = [
        {
            name: "Do'kon",
            link: "/seller/magazines"
        },
        {
            name: stores.find(item => item.id === product?.storeId)?.storeName || "",
            link: `/seller/products/${product?.storeId}`
        },
        {
            name: product?.productName || "",
            link: `/seller/products/${product?.storeId}`
        }
    ]

    return (
        <div>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
            <div className="flex flex-col md:flex-row gap-5 justify-between">
                <Card shadow color={"white"} className={"border w-full md:w-6/12"}>
                    <CardBody className={"flex justify-start"}>
                        <div className="w-4/12 xl:h-36 sm:h-40 h-36">
                            <LazyLoadImage effect={"black-and-white"}
                                           className={"object-cover object-center xl:h-36 sm:h-40 h-36"}
                                           alt={product?.productName}
                                           src={product?.productImgUrl || noIMG}
                            />
                        </div>
                        <div className="w-8/12 flex flex-col pl-3">
                            <Typography variant={"h2"}
                                        className={"font-bold text-base"}>
                                {product?.productName}
                            </Typography>
                            <Typography variant={"small"} className={"font-medium text-base"}>
                                Miqdori: {product?.productQuantity} {product?.productMeasure}
                            </Typography>
                            <Typography variant={"small"} className={"font-medium text-base"}>
                                Narxi: {afterCurrency}
                            </Typography>
                            <div
                                className="flex h-full items-center xl:items-end justify-between xl:justify-start mt-3 xl:mt-0">
                                <div
                                    className={"md:w-1/2 w-full h-8 flex "}>
                                    {product?.productMeasure !== 'dona' ? <InputComponent.Text value={currentAmount}
                                                                                               name={"amount"}
                                                                                               placeholder={"Miqdorini kiriting"}
                                                                                               onChange={(e: {
                                                                                                   target: {
                                                                                                       value: string;
                                                                                                   };
                                                                                               }) => increment(handleNumberMask(e.target.value))}
                                                                                               label={""}/> : <div
                                        className={"w-full h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                                        <Typography variant={"small"}
                                                    className={"cursor-pointer px-2 py-1 rounded text-base"}
                                                    onClick={pieceItemDic}>-</Typography>
                                        <Typography
                                            variant={"small"}>{currentAmount}</Typography>
                                        <Typography variant={"small"}
                                                    className={"cursor-pointer px-2 py-1 rounded text-base"}
                                                    onClick={pieceItemIn}>+</Typography>
                                    </div>}
                                    {/*<InputComponent.Text value={currentAmount}*/}
                                    {/*                     name={"amount-item"}*/}
                                    {/*                     placeholder={"Miqdorini kiriting"}*/}
                                    {/*                     onChange={(e: {*/}
                                    {/*                         target: { value: string; };*/}
                                    {/*                     }) => increment(handleNumberMask(e.target.value))}*/}
                                    {/*                     label={"Miqdorini kiriting"}/>*/}
                                </div>
                            </div>
                        </div>
                        <div className="hidden w-4/12 h-full xl:hidden xl:flex-col gap-3 justify-center">
                            <div className="flex w-full items-center gap-3">
                                <div
                                    className={"w-6/12 h-8 flex "}>
                                    {product?.productMeasure !== 'dona' ? <InputComponent.Text value={currentAmount}
                                                                                               name={"amount"}
                                                                                               placeholder={"Miqdorini kiriting"}
                                                                                               onChange={(e: {
                                                                                                   target: {
                                                                                                       value: string;
                                                                                                   };
                                                                                               }) => increment(handleNumberMask(e.target.value))}
                                                                                               label={""}/> : <div
                                        className={"w-full h-8 rounded-lg border border-black flex justify-between items-center select-none"}>
                                        <Typography variant={"small"}
                                                    className={"cursor-pointer px-2 py-1 rounded text-base"}
                                                    onClick={pieceItemDic}>-</Typography>
                                        <Typography
                                            variant={"small"}>{currentAmount}</Typography>
                                        <Typography variant={"small"}
                                                    className={"cursor-pointer px-2 py-1 rounded text-base"}
                                                    onClick={pieceItemIn}>+</Typography>
                                    </div>}
                                    {/*<InputComponent.Text value={currentAmount}*/}
                                    {/*                     name={"amount-item"}*/}
                                    {/*                     placeholder={"Miqdorini kiriting"}*/}
                                    {/*                     onChange={(e: {*/}
                                    {/*                         target: { value: string; };*/}
                                    {/*                     }) => increment(handleNumberMask(e.target.value))}*/}
                                    {/*                     label={"Miqdorini kiriting"}/>*/}
                                </div>
                                <div className="">
                                    <Typography variant={"h2"}
                                                className={"font-bold text-base"}>
                                        {product !== null && formatter.format(currentAmount !== "0" ? ((afterCurrency - currentDiscount) * Number(currentAmount)) : afterCurrency)}
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
                        <div className="w-2/3">
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
                        <Typography variant={"lead"}
                                    className={"font-bold text-base mt-4"}>
                            {product !== null && formatter.format(currentAmount !== "0" ? (afterCurrency - currentDiscount) * Number(currentAmount) : afterCurrency)}
                        </Typography>
                    </div>
                </Card>
                <Card shadow color={"white"} className={"border w-full md:w-3/12"}>
                    <CardBody className={"flex flex-col"}>
                        <div className="w-full flex justify-between items-center mb-3 py-2 border-b border-dashed">
                            <Typography variant={"h2"}
                                        className={"font-bold text-xl"}>
                                {formatter.format(afterCurrency)}
                            </Typography>
                            <div className="">
                                <BiEdit size={23} color={"orange"} onClick={toggleEdit} className={"cursor-pointer"}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-12">
                            <div className="">
                                <Typography variant={"paragraph"}
                                            className={"font-medium text-xs"}>
                                    Asosiy narxi: {formatter.format(afterMainCurrency)}
                                </Typography>
                            </div>
                            <div className="">
                                <Typography variant={"paragraph"}
                                            className={"font-medium text-xs"}>
                                    Modeli: {product?.productModel}
                                </Typography>
                            </div>
                            <div className="">
                                <Typography variant={"paragraph"}
                                            className={"font-medium text-xs"}>
                                    Izoh: {product?.productOption}
                                </Typography>
                            </div>
                            {isBasket ? <>
                                <ButtonComponent className={"border border-red"}
                                                 onClick={() => dispatch(removeBasket(Number(id)))}
                                                 outline
                                                 label={<div className={"flex items-center gap-2"}>
                                                     <FaTrash className={'text-lg text-red'}/>
                                                     <Typography variant={"small"} className={"normal-case text-xs "}>
                                                         Korzinkadan olib tashlash
                                                     </Typography>
                                                 </div>}
                                />
                            </> : <>
                                <ButtonComponent className={"bg-primary group"}
                                                 disabled={(product?.productQuantity || 1) < 1}
                                                 onClick={() => {
                                                     increment("1")
                                                     navigate("/seller/baskets")
                                                 }}
                                                 label={<>
                                                     <LuShoppingBasket
                                                         className={'text-lg text-white group-hover:text-black'}/>
                                                     <Typography variant={"small"} className={"normal-case text-xs "}>
                                                         Bittada sotib olish
                                                     </Typography>
                                                 </>}
                                />
                                <ButtonComponent onClick={() => increment("1")}
                                                 className={"border border-green"}
                                                 outline
                                                 disabled={(product?.productQuantity || 1) < 1}
                                                 label={<div className={"text-green flex items-center gap-2"}>
                                                     <SlBasket
                                                         className={'text-lg text-green'}/> Korzinkaga qo'shish
                                                 </div>}
                                />
                            </>
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
            <EditProduct open={isEdit} toggle={toggleEdit}/>
            <div className="w-full text-center my-5">
                <Typography variant={"h2"}
                            className={"font-bold text-lg"}>
                    Boshqa mahsulotlar
                </Typography>
            </div>
            <ProductList isView/>
        </div>
    );
}