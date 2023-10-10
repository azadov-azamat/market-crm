import {Button, Card, CardBody, Typography,} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs"
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks.ts";
import {login} from "../../redux/reducers/variable.ts";
import {LoginDataProps} from "../../interface/redux/variable.interface.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {getToken} from "../../config/api.ts";

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (getToken()) {
            navigate("/seller/magazines")
        }
    }, [getToken]);

    return (
        <div className={'w-full h-screen flex justify-center items-center'}>
            <Card color="white" shadow={true}  className={"mx-4 md:mx-0"}>
                <CardBody>
                    <Typography variant="h4" color="blue-gray">
                        Xush kelibsiz
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal" variant={"paragraph"}>
                        Ma'muriyat tomonidan berilgan ma'lumotlaringizni kiriting
                    </Typography>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            const data = new FormData(e.currentTarget)

                            const loginData: LoginDataProps = {
                                sellerPhone: String(data.get("sellerPhone")),
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
                        className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <InputComponent.PhoneNumber name={"sellerPhone"}/>
                            <InputComponent.Password name={"sellerPassword"}/>
                        </div>
                        <Button className="mt-6" type={"submit"} fullWidth>
                            Kirish
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>

    );
}