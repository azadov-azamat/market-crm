import React from "react";
import BreadcumbsComponent from "../../components/page-title/breadcumbs.tsx";
import {BreadCumbsDataProps} from "../../interface/modal/modal.interface.ts";
import {getMgId} from "../../config/servise.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {Button, Card, CardBody} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import { getStores, getUserMe, patchUser } from "../../redux/reducers/variable.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {stores, userData} = useAppSelector(state => state.variables)
    const inputDiv = "my-2"

    React.useEffect(() => {
        dispatch(getStores())
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
            name: "Profil",
            link: ``
        }
    ]

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
                                const user = new FormData(e.currentTarget)

                                const data = {
                                    id: userData?.id,
                                    body: {
                                        sellerName: String(user.get("sellerName")),
                                        sellerPhone: String(user.get("sellerPhone")),
                                        sellerPassword: String(user.get("sellerPassword")),
                                        sellerImgUrl: String(user.get("sellerImgUrl"))
                                    }
                                }
                                dispatch(patchUser(data)).then(unwrapResult).then(function () {
                                   dispatch(getUserMe())
                                    toast.success("Saqlandi")
                                })
                            }}>
                            <div className={`${inputDiv} w-full flex justify-center`}>
                                <InputComponent.File
                                    name={"sellerImgUrl"}
                                    defaultImage={userData?.sellerImgUrl}
                                />
                            </div>
                            <div className={inputDiv}>
                                <InputComponent.Text
                                    name={"sellerName"}
                                    required
                                    placeholder={"Familiya Ism Sharif"}
                                    defaultValue={userData?.sellerName}
                                    label={"F.I.O"}/>
                            </div>

                            <div className={inputDiv}>
                                <InputComponent.Text
                                    name={"sellerPhone"}
                                    required

                                defaultValue={userData?.sellerPhone}
                                    placeholder={"Telefon raqamingiz"}
                                    label={"Telefon raqam"}/>
                            </div>

                            <div className={inputDiv}>
                                <InputComponent.Text
                                    name={"sellerPassword"}
                                    type="password"
                                    placeholder={"parol kiriting"}
                                    label={"Parol"}/>
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