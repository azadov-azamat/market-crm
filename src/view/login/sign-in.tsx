import React from "react";
import {Card, CardBody, Typography,} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs"
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {login} from "../../redux/reducers/variable.ts";
import {LoginDataProps} from "../../interface/redux/variable.interface.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {getToken} from "../../config/api.ts";
import {BiSupport} from "react-icons/bi";
import loginBg from '../../assets/bg/login.png'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {handleNumberMask} from "../../config/servise.ts";
import ButtonComponent from "../../components/button";

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {uz, loading} = useAppSelector(state => state.variables)
    const [phone, setPhone] = React.useState("")

    React.useEffect(() => {
        if (getToken()) {
            navigate("/seller/magazines")
        }
    }, [getToken]);

    return (
        <div
            className={'w-full h-screen flex md:flex-row flex-col md:justify-between justify-center items-center md:px-5 px-2 gap-5 md:gap-0'}>
            <div className="w-full md:w-1/2 flex justify-center">
                <LazyLoadImage effect={"black-and-white"}
                               className={"w-72 md:w-full md:h-full md:rounded-xl rounded-3xl "}
                               alt={"login-illustration"}
                               src={loginBg}
                />
            </div>
            <div
                className="w-full md:w-1/2 flex flex-col md:justify-center justify-between items-center md:gap-10 gap-5">
                <Card color="white" shadow={true} className={""}>
                    <CardBody>
                        <div className="flex flex-col gap-1 text-center">
                            <Typography variant="h4" className={"text-black"}>
                                Xush kelibsiz
                            </Typography>
                            <Typography variant={"paragraph"} className={"text-black"}>
                                Ma'muriyat tomonidan berilgan ma'lumotlaringizni kiriting
                            </Typography>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                const data = new FormData(e.currentTarget)

                                const loginData: LoginDataProps = {
                                    sellerPhone: uz + phone,
                                    sellerPassword: String(data.get("sellerPassword"))
                                }

                                dispatch(login(loginData)).then(unwrapResult).then(e => {
                                    if (e.data?.seller?.sellerRole === "seller") {
                                        navigate(`seller/magazines`)
                                    } else {
                                        toast.error("Kirish mumkin emas!")
                                    }
                                })
                            }}
                            className="md:mt-8 mt-4 mb-2 w-full max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col md:gap-6 gap-3">
                                <InputComponent.Text
                                    name={"sellerPhone"}
                                    required
                                    type={'phone'}
                                    value={phone}
                                    onChange={event => setPhone(handleNumberMask(event.target.value))}
                                    placeholder={"Ro'yhatdan o'tgan telefon raqami"}
                                    label={"Telefon raqam kiriting"}
                                />
                                <InputComponent.Text
                                    name={"sellerPassword"}
                                    required
                                    type={'password'}
                                    label={"Maxfiy so'z kiriting"}
                                    placeholder={"Ro'yhatga olingan maxfiy so'z"}
                                />
                            </div>
                            <ButtonComponent className={"bg-primary text-white hover:text-black"} label={"Kirish"} type={"submit"} loading={loading} disabled={loading}/>
                        </form>
                    </CardBody>
                </Card>
                <div className="flex justify-center items-center gap-2 w-full">
                    <BiSupport className={"text-3xl"}/>
                    <div className="text-center">
                        <Typography variant="paragraph" className={"font-bold text-black"}>
                           Texnik yordamchi
                        </Typography>
                        <div className="flex flex-col gap-1 ">
                            <a href="tel:+998975077061" className={"text-sm"}>+998 (97) 507-70-61</a>
                            {/*<a href="tel:+998992052443" className={"text-sm"}>+998 (93) 205-24-43</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}