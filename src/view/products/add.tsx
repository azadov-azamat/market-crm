import React from "react";

import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import {getMgId, handleNumberMask} from "../../config/servise.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {createProduct, getAddresses, getStores} from "../../redux/reducers/variable.ts";
import {useNavigate} from "react-router-dom";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";

export default function AddProduct() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {stores, adresses} = useAppSelector(state => state.variables)

    const inputDiv = "my-2"
    const measureList = ["kg", "dona", "litr", "metr", "metrkv"]

    const [price, setPrice] = React.useState<string>("")
    const [mainPrice, setMainPrice] = React.useState<string>("")
    const [quantity, setQuantity] = React.useState<string>("")

    React.useEffect(() => {
        dispatch(getStores())
        dispatch(getAddresses())
    }, [])

    const breadCumbc: BreadCumbsDataProps[] = [
        {
            name: "Do'kon",
            link: "/seller/magazines"
        },
        {
            name: stores.find(item => item.id === Number(getMgId()))?.storeName || "",
            link: `/seller/products/${getMgId()}`
        },
        {
            name: "Mahsulot qo'shish",
            link: ``
        }
    ]

    if (!getMgId()) {
        return (
            <div>
                <div className="w-full overflow-ellipsis overflow-hidden">
                    <BreadcumbsComponent data={breadCumbc}/>
                </div>
                <div className={"w-full h-[80vh] flex justify-center items-center"}>
                    <div className="flex flex-col items-center gap-3">
                        <Typography variant={"h4"}>
                           Do'kon mavjud emas
                        </Typography>
                        <Button className={"normal-case"} onClick={() => navigate(`/seller/magazines`)}>Do'konlar</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="w-full overflow-ellipsis overflow-hidden">
                <BreadcumbsComponent data={breadCumbc}/>
            </div>
            <div className={"w-full flex justify-center"}>
                <Card className={"md:w-2/5 w-full"}>
                    <CardBody>
                        <form
                            id="Form"
                            action=""
                            onSubmit={(e) => {
                                e.preventDefault()
                                const data = new FormData(e.currentTarget)
                                dispatch(createProduct({
                                    productOption: String(data.get("productOption")),
                                    storeId: Number(getMgId()),
                                    productName: String(data.get("productName")),
                                    productModel: String(data.get("productModel")),
                                    productPrice: Number(price),
                                    productQuantity: Number(quantity),
                                    productMeasure: String(data.get("productMeasure")),
                                    adressId: Number(data.get("addresses")),
                                    productMainPrice: Number(mainPrice),
                                    productCurrency: String(data.get("productCurrency")) === 'true' ? 'dollar' : 'sum',
                                    productImgUrl: String(data.get("productImgUrl"))
                                }))
                                navigate(`/seller/products/${getMgId()}`)
                            }}>
                            <div className={`${inputDiv} w-full flex justify-center`}>
                                <InputComponent.File
                                    name={"productImgUrl"}
                                />
                            </div>
                            <div className={inputDiv}>
                                <InputComponent.Text
                                    name={"productName"}
                                    required
                                    placeholder={"Mahsulot nomini kiriting"}
                                    label={"Nomi"}/>
                            </div>
                            <div className={inputDiv}>
                                <InputComponent.Text
                                    name={"productModel"}
                                    placeholder={"Mahsulot modelini kiriting"}
                                    label={"Modeli"}/>
                            </div>
                            <div className={inputDiv}>
                                <InputComponent.Textarea
                                    name={"productOption"}
                                    placeholder={"Mahsulot option kiriting"}
                                    label={"Option"}/>
                            </div>
                            <div className={`${inputDiv}  flex items-center gap-2`}>
                                <InputComponent.Text
                                    required
                                    name={"productMainPrice"}
                                    placeholder={"Mahsulot narxini kiriting"}
                                    label={"Asosiy narxi"}
                                    value={mainPrice}
                                    onChange={e => setMainPrice(handleNumberMask(e.target.value))}
                                />
                                <select name="productCurrency" id="productCurrency" required
                                        className={"outline-0 border border-black/50 rounded-xl mt-4 px-2 md:py-2.5 py-1.5"}>
                                    <option value={"true"}>dollar</option>
                                    <option value={"false"}>sum</option>
                                </select>
                            </div>
                            <div className={inputDiv}>
                                <InputComponent.Text
                                    required
                                    name={"productPrice"}
                                    placeholder={"Mahsulot narxini kiriting"}
                                    label={"Narxi"}
                                    value={price}
                                    onChange={e => setPrice(handleNumberMask(e.target.value))}
                                />
                            </div>
                            <div className={`${inputDiv} flex items-center gap-2`}>
                                <InputComponent.Text
                                    required
                                    name={"productQuantity"}
                                    placeholder={"Mahsulot miqdorini kiriting"}
                                    label={"Miqdori"}
                                    value={quantity}
                                    onChange={e => setQuantity(handleNumberMask(e.target.value))}
                                />
                                <select name="productMeasure" id="productMeasure" required
                                        className={"outline-0 border border-black/50 rounded-xl mt-4 px-2 md:py-2.5 py-1.5"}>
                                    {measureList.map((item, ind) => <option key={ind} value={item}>{item}</option>)}
                                </select>
                            </div>
                            <div className={`${inputDiv} flex flex-col`}>
                                <label htmlFor="addresses" className={"font-medium text-xs block mb-1"}>Mahsulot manzili
                                    *</label>
                                <select name="addresses" id="addresses" required
                                        className={"outline-0 border border-black/50 rounded-xl px-2 md:py-2.5 py-1.5"}>
                                    {adresses.map((item, ind) => <option key={ind}
                                                                         value={item.id}>{item.adressName}</option>)}
                                </select>
                            </div>
                            <div className={"flex gap-3 w-full justify-end mt-3"}>
                                <Button type={"reset"} color={"red"}
                                        onClick={() => navigate(`/seller/products/${getMgId()}`)}
                                        className={"normal-case text-xs "}>Orqaga</Button>
                                <Button type={"submit"} color={"green"}
                                        className={"normal-case text-xs "}>Saqlash</Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}