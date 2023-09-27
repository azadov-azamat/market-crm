import React from 'react';
import SidebarModal from "../../components/modal/sidebar";
import {Button, Input, Radio} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import {useFormik} from "formik";
import {DebtorDataProps} from "../../interface/redux/variable.interface.ts";
import * as Yup from "yup"
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {setDebtorData} from "../../redux/reducers/variable.ts";

interface DebtorModalProps {
    isOpen: boolean;
    toggle?: React.MouseEventHandler<HTMLButtonElement> | any;
    totalPrice: number;
}

export function DebtorSidebar({isOpen, toggle, totalPrice}: DebtorModalProps) {

    const dispatch = useAppDispatch()

    const {debtor} = useAppSelector(state => state.variables)

    const [phone, setPhone] = React.useState("")

    const ValidateSchema = Yup.object().shape({
        name: Yup.string().required(),
        address: Yup.string().required(),
        payType: Yup.string().required(),
        phoneNumber: Yup.string().required(),
        expDate: Yup.string().required()
    })

    const formik = useFormik<DebtorDataProps>({
        initialValues: {
            name: "",
            address: "",
            expDate: "",
            givenSum: 0,
            paidSum: 0,
            payType: "",
            phoneNumber: phone
        },
        validationSchema: ValidateSchema,
        enableReinitialize: true,
        onSubmit: (val, {resetForm}) => {
            dispatch(setDebtorData(val))
            resetForm({values: undefined})
            toggle()
        }
    })

    return (
        <SidebarModal title={"Qarz savdo"} open={isOpen} toggle={toggle}>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                <Input
                    name={"name"}
                    label={"Qarzdor F.I.O"}
                    defaultValue={debtor?.name}
                    onChange={formik.handleChange}
                    crossOrigin={undefined}
                />

                <Input
                    name={"address"}
                    defaultValue={debtor?.address}
                    onChange={formik.handleChange}
                    label={"Manzilni kiriting"}
                    crossOrigin={undefined}
                />

                <InputComponent.PhoneNumber setState={setPhone}/>

                <Input
                    name={"expDate"}
                    type={"date"}
                    defaultValue={debtor?.expDate}
                    onChange={formik.handleChange}
                    label={"To'lov qilish sanasi"}
                    crossOrigin={undefined}
                />

                <Input
                    name={"total_price"}
                    label={"Umumiy narx"}
                    value={totalPrice}
                    crossOrigin={undefined}
                />

                <Input
                    name={"given_price"}
                    label={"Oldin berilgan pul"}
                    value={"300 000 sum"}
                    crossOrigin={undefined}
                />
                <Input
                    name={"paidSum"}
                    label={"Beriladigan pul"}
                    defaultValue={debtor?.paidSum}
                    onChange={formik.handleChange}
                    crossOrigin={undefined}
                />
                <div className="">
                    <Radio name={"debt-pay-type"}
                           value={'transfer'}
                           defaultChecked={debtor !== null ? debtor?.payType === "transfer" : true}
                           onChange={() => formik.setFieldValue('payType', 'transfer')}
                           label={<img
                               width={50}
                               src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                               alt="transfer"/>} crossOrigin={undefined}
                    />
                    <Radio name={"debt-pay-type"}
                           value={"naqd"}
                           defaultChecked={debtor?.payType === "naqd"}
                           onChange={() => formik.setFieldValue('payType', 'naqd')}
                           label={<img
                               width={50}
                               className={"rounded-full"}
                               src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                               alt="naqd"/>} crossOrigin={undefined}
                    />
                    <Radio name={"debt-pay-type"}
                           value={"terminal"}
                           defaultChecked={debtor?.payType === "terminal"}
                           onChange={() => formik.setFieldValue('payType', 'terminal')}
                           label={<img
                               width={50}
                               src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                               alt="terminal"/>} crossOrigin={undefined}
                    />
                </div>
                <div className="flex items-center justify-between mt-8">
                    <Button onClick={toggle} color={"red"}>Bekor qilish</Button>
                    <Button color={"orange"} type={"submit"}
                            disabled={!formik.isValid || !formik.dirty}>Saqlash</Button>
                </div>
            </form>
        </SidebarModal>
    );
}