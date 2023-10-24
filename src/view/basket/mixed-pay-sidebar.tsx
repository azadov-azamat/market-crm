import React from 'react';
import SidebarModal from "../../components/modal/sidebar";
import {Radio} from "@material-tailwind/react";
import {MixedPayDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {setMixedPayList} from "../../redux/reducers/variable.ts";
import {getMgId, handleNumberMask} from "../../config/servise.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import * as InputComponent from "../../components/inputs";
import {BiX} from "react-icons/bi";
import {toast} from "react-toastify";
import ButtonComponent from "../../components/button";

interface MixedPaySidebarProps extends ModalInterfaceProps {
    totalPrice: number;
}

export function MixedPaySidebar({open, toggle, totalPrice}: MixedPaySidebarProps) {

    const dispatch = useAppDispatch()
    const {mixedPay} = useAppSelector(state => state.variables)

    const [isAdd, setAdd] = React.useState<boolean>(false)
    const [inputFields, setInputFields] = React.useState<MixedPayDataProps[]>(mixedPay.length > 1 ? mixedPay : [
        {paymentAmount: totalPrice, paymentType: "transfer", storeId: getMgId()}
    ]);

    React.useEffect(() => {
        let amount = 0
        inputFields.forEach(item => {
            amount += item.paymentAmount
        })
        if (amount >= totalPrice) {
            setAdd(true)
        } else {
            setAdd(false)
            for (let i = 0; i < inputFields.length; i++) {
                if (inputFields[i]?.paymentAmount === 0) {
                    inputFields.splice(i, 1);
                    setInputFields([...inputFields]);
                }
            }
        }
    }, [inputFields])

    function handleMask(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const {name, value} = e.target

        if (name === 'paymentAmount') {
            const num = Number(handleNumberMask(value))
            let amount = 0
            for (let i = 0; i < inputFields.length; i++) {
                if (i !== index) {
                    amount += inputFields[i].paymentAmount
                }
            }

            if (totalPrice >= amount + num) {
                inputFields[index].paymentAmount = num;
            } else {
                toast.warning("Umumiy narxdan oshmasligi kerak")
            }
        } else {
            inputFields[index].paymentType = value;
        }
        setInputFields([...inputFields])
    }

    const handleAdd = () => {
        const list = [...inputFields];

        let amount = 0
        for (let i = 0; i < inputFields.length; i++) {
            amount += inputFields[i].paymentAmount
        }

        list.push({
            paymentType: 'transfer',
            paymentAmount: totalPrice - amount,
            storeId: getMgId()
        })
        setInputFields(list)
    }

    const handleRemove = (index: number) => {
        inputFields.splice(index, 1);
        setInputFields([...inputFields]);
    }

    function SavePayments() {
        dispatch(setMixedPayList(inputFields))
        toggle()
    }

    return (
        <SidebarModal title={"To'lovlar kiritish"} open={open} toggle={toggle}>
            {inputFields.map((field, index) => (
                <div className={"my-2 flex items-start gap-3 relative"} key={index}>
                    <div className="w-[98%]">
                        <InputComponent.Text
                            name={"paymentAmount"}
                            value={String(field.paymentAmount)}
                            onChange={(e) => handleMask(e, index)}
                            placeholder={"To'lov qilmoqchi bo'lgan summa"}
                            label={"Beriladigan pul"}
                        />
                        <div className="">
                            <Radio name={`debt-pay-type-${index}`}
                                   value={'transfer'}
                                   defaultChecked
                                   onChange={(e) => handleMask(e, index)}
                                   label={<img
                                       width={50}
                                       src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                                       alt="transfer"/>} crossOrigin={undefined}
                            />
                            <Radio name={`debt-pay-type-${index}`}
                                   value={"naqd"}
                                   onChange={(e) => handleMask(e, index)}
                                   label={<img
                                       width={50}
                                       className={"rounded-full"}
                                       src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                                       alt="naqd"/>} crossOrigin={undefined}
                            />
                            <Radio name={`debt-pay-type-${index}`}
                                   value={"terminal"}
                                   onChange={(e) => handleMask(e, index)}
                                   label={<img
                                       width={50}
                                       src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                                       alt="terminal"/>} crossOrigin={undefined}
                            />
                        </div>
                    </div>
                    <div
                        className={`absolute -right-3`}>
                        {inputFields.length > 1 && <ButtonComponent className={"bg-red p-1 group"}
                                                                    onClick={() => handleRemove(index)}
                                                                    label={<BiX className={"text-xl group-hover:text-red text-white"}/>}/>
                        }
                    </div>
                </div>
            ))}
            <div
                className={`flex items-center justify-center`}>
                {!isAdd &&
                    <ButtonComponent className={"bg-green"} onClick={handleAdd} label={"Qo'shish"}/>}
            </div>
            <div className="flex items-center justify-end mt-8">
                <ButtonComponent onClick={SavePayments} className={"w-full bg-primary"} label={'Saqlash'}/>
            </div>
        </SidebarModal>
    );
}