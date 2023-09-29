import React, {useEffect} from 'react';
import {filterProduct} from "../../redux/reducers/variable.ts";
import DialogModal from "../modal/dialog";
import {Input, Typography} from "@material-tailwind/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {useNavigate} from "react-router-dom";

export default function SearchModal({toggle, open}: ModalInterfaceProps) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {fltProduct} = useAppSelector(state => state.variables)

    const [search, setSearch] = React.useState<string>("")

    useEffect(() => {
        if (search.length !== 0) {
            dispatch(filterProduct(search))
        } else {
            dispatch(filterProduct(""))
        }
    }, [search])

    return (
        <DialogModal open={open} toggle={toggle}>
            <div className="relative w-full">
                <Input
                    label={"Mahsulotlarni qidirish"}
                    name={"search"}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    crossOrigin={undefined}
                />
                {
                    fltProduct.map((item, ind) =>
                        <div key={ind} className={"flex my-2 border rounded p-1 cursor-pointer"}
                             onClick={() => {
                                 navigate(`/seller/product/${item.id}`)
                                 setSearch("")
                                 toggle()
                             }}
                        >
                            <div className="w-2/12 h-20">
                                <LazyLoadImage effect={"black-and-white"}
                                               className={"object-cover object-center h-20"}
                                               alt={item.productName}
                                               src={typeof item.productImgUrl === "object" ? URL.createObjectURL(Object(item.productImgUrl)) : item.productImgUrl}
                                />
                            </div>
                            <div className="w-10/12 flex flex-col justify-between pl-3">
                                <Typography variant={"small"}
                                            className={"font-bold text-sm"}>
                                    {item.productName}
                                </Typography>
                                <div className="w-full flex justify-between">
                                    <Typography variant={"small"} className={"font-bold text-xs"}>
                                        {item.productPrice} sum
                                    </Typography>
                                    <Typography variant={"small"} className={"font-medium text-xs"}>
                                        Miqdori: {item.productQuantity} {item.productMeasure}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </DialogModal>
    );
}