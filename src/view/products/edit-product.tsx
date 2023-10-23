import {Button} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import DialogModal from "../../components/modal/dialog";
import {handleNumberMask} from "../../config/servise.ts";
import React, {useEffect} from "react";
import {patchProduct} from "../../redux/reducers/variable.ts";

export default function EditProduct({toggle, open}: ModalInterfaceProps) {

    const dispatch = useAppDispatch()
    const {product} = useAppSelector(state => state.variables)

    const measureList = ["kg", "dona", "litr", "metr", "metrkv"]

    const [price, setPrice] = React.useState<string>("")
    const [quantity, setQuantity] = React.useState<string>("")

    useEffect(() => {
        setPrice(product?.productPrice.toString() || '')

        return()=>{
            setPrice("")
            setQuantity("")
        }
    }, [product]);
    const toggleCancel = () => {
        toggle()
    }

    return (
        <DialogModal toggle={toggleCancel} open={open} size={"md"}>
            <form
                id="Form"
                action=""
                className={"flex flex-col"}
                onSubmit={(e) => {
                    e.preventDefault()
                    const form = new FormData(e.currentTarget)
                    const data = {
                        productPrice: String(form.get("productPrice")),
                        productQuantity: Number(form.get("productQuantity")) + Number(product?.productQuantity || 0),
                        productCurrency: String(form.get("productCurrency")) === 'true' ? 'dollar' : 'sum',
                    }

                    dispatch(patchProduct({
                        id: product?.id,
                        body: data
                    }))
                    toggleCancel()
                }}>
                <div className="flex flex-col gap-2">
                    <div className={"flex items-center gap-2 "}>
                        <InputComponent.Text
                            required
                            name={"productPrice"}
                            placeholder={"Mahsulot narxini kiriting"}
                            label={"Sotuv narxi"}
                            value={price}
                            onChange={e => setPrice(handleNumberMask(e.target.value))}
                        />
                        <select name="productCurrency" id="productCurrency" required
                                className={"outline-0 border border-black rounded-xl mt-4 px-2 md:py-2.5 py-1.5"}>
                            <option selected={product?.productCurrency === 'dollar'} value={"true"}>dollar</option>
                            <option selected={product?.productCurrency !== 'dollar'} value={"false"}>sum</option>
                        </select>
                    </div>
                    <div className={"flex items-center gap-2 "}>
                        <InputComponent.Text
                            required
                            name={"productQuantity"}
                            placeholder={"Mahsulot miqdorini kiriting"}
                            label={"Miqdori"}
                            value={quantity}
                            onChange={e => setQuantity(handleNumberMask(e.target.value))}
                        />
                        <select name="productMeasure" id="productMeasure" required
                                className={"outline-0 border border-black rounded-xl mt-4 px-2 md:py-2.5 py-1.5"}>
                            {measureList.map((item, ind) => (
                                <option selected={product?.productMeasure === item} key={ind}
                                        value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={"flex gap-3 w-full justify-center mt-3"}>
                    <Button type={"reset"} color={"red"}
                            onClick={toggleCancel}
                            className={"normal-case text-xs "}>Bekor qilish</Button>
                    <Button type={"submit"} color={"green"}
                            className={"normal-case text-xs "}>Saqlash</Button>
                </div>
            </form>
        </DialogModal>
    );
}