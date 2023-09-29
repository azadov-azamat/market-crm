import React from 'react';
import SidebarModal from "../../components/modal/sidebar";
import {Button, Radio} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import {DebtorDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {setDebtorData} from "../../redux/reducers/variable.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import {handleNumberMask} from "../../config/servise.ts";

interface DebtorModalProps extends ModalInterfaceProps {
    totalPrice: number;
    currentUser?: DebtorDataProps | null
}

export function DebtorSidebar({open, toggle, totalPrice}: DebtorModalProps) {

    const dispatch = useAppDispatch()

    const {debtor} = useAppSelector(state => state.variables)

    const [phone, setPhone] = React.useState("")
    const [gvnPrice, setGvnPrice] = React.useState("")

    // const ValidateSchema = Yup.object().shape({
    //     name: Yup.string().required(),
    //     address: Yup.string().required(),
    //     payType: Yup.string().required(),
    //     phoneNumber: Yup.string().required(),
    //     expDate: Yup.string().required()
    // })

    // const formik = useFormik<DebtorDataProps>({
    //     initialValues: {
    //         name: "",
    //         address: "",
    //         expDate: "",
    //         givenSum: 0,
    //         paidSum: 0,
    //         payType: "",
    //         phoneNumber: phone
    //     },
    //     validationSchema: ValidateSchema,
    //     enableReinitialize: true,
    //     onSubmit: (val, {resetForm}) => {
    //         dispatch(setDebtorData(val))
    //         resetForm({values: undefined})
    //         toggle()
    //     }
    // })

    return (
        <SidebarModal title={"Qarz savdo"} open={open} toggle={toggle}>
            <form onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                dispatch(setDebtorData({
                    name: String(data.get("name")),
                    address: String(data.get("address")),
                    expDate: String(data.get("expDate")),
                    givenSum: 0,
                    paidSum: 0,
                    payType: String(data.get("debt-pay-type")),
                    phoneNumber: phone
                }))
                toggle()

            }} className="flex flex-col gap-3">
                <InputComponent.Text
                    name={"name"}
                    required
                    placeholder={"Qarzga oluvchi ism sharifi"}
                    label={"Qarzdor F.I.O"}
                />

                <InputComponent.Text
                    name={"address"}
                    required
                    placeholder={"Qarzga oluvchi manzili"}
                    label={"Manzilni kiriting"}
                />
                <InputComponent.Text
                    name={"phone"}
                    required
                    value={phone}
                    onChange={event => setPhone(handleNumberMask(event.target.value))}
                    placeholder={"Qarzga oluvchi telefon raqami"}
                    label={"Telefon kiriting"}
                />

                {/*<InputComponent.PhoneNumber name={"phone"}/>*/}

                <InputComponent.Text
                    name={"expDate"}
                    required
                    type={"date"}
                    placeholder={"Qarz qaytarilish sanasi"}
                    label={"To'lov qilish sanasi"}
                />

                <InputComponent.Text
                    name={"total_price"}
                    required
                    value={totalPrice}
                    // placeholder={"Qarzga oluvchi manzili"}
                    label={"Umumiy narx"}
                />

                {debtor && <InputComponent.Text
                    name={"given_price"}
                    label={"Oldin berilgan pul"}
                    value={"300 000 sum"}
                />}
                <InputComponent.Text
                    name={"paidSum"}
                    value={gvnPrice}
                    onChange={e => setGvnPrice(handleNumberMask(e.target.value))}
                    placeholder={"To'lov qilmoqchi bo'lgan summa"}
                    label={"Beriladigan pul"}
                />
                <div className="">
                    <Radio name={"debt-pay-type"}
                           value={'transfer'}
                           defaultChecked={debtor !== null ? debtor?.payType === "transfer" : true}
                           label={<img
                               width={50}
                               src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                               alt="transfer"/>} crossOrigin={undefined}
                    />
                    <Radio name={"debt-pay-type"}
                           value={"naqd"}
                           defaultChecked={debtor?.payType === "naqd"}
                           label={<img
                               width={50}
                               className={"rounded-full"}
                               src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                               alt="naqd"/>} crossOrigin={undefined}
                    />
                    <Radio name={"debt-pay-type"}
                           value={"terminal"}
                           defaultChecked={debtor?.payType === "terminal"}
                           label={<img
                               width={50}
                               src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                               alt="terminal"/>} crossOrigin={undefined}
                    />
                </div>
                <div className="flex items-center justify-between mt-8">
                    <Button onClick={toggle} color={"red"}>Bekor qilish</Button>
                    <Button color={"orange"} type={"submit"}
                        // disabled={!formik.isValid || !formik.dirty}
                    >Saqlash</Button>
                </div>
            </form>
        </SidebarModal>
    );
}