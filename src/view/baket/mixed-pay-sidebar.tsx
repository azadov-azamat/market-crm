import React from 'react';
import SidebarModal from "../../components/modal/sidebar";
import {Button, Input, Radio} from "@material-tailwind/react";
import {MixedPayDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {setMixedPayList} from "../../redux/reducers/variable.ts";
import {handleNumberMask} from "../../config/servise.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";


export function MixedPaySidebar({open, toggle}: ModalInterfaceProps) {

    const dispatch = useAppDispatch()

    const [inputFields, setInputFields] = React.useState<MixedPayDataProps[]>([{
        paymentAmount: 0,
        paymentType: ''
    }]);

    function handleMask(e: any, index: number) {
        const name: "paymentType" | "paymentAmount" = e.target.name
        const {value} = e.target

        if (name === 'paymentAmount') {
            inputFields[index].paymentAmount = Number(handleNumberMask(value));
        } else {
            inputFields[index].paymentType = value;
        }
        setInputFields([...inputFields])
    }

    const handleAdd = () => {
        const list = [...inputFields];
        list.push({
            paymentType: '',
            paymentAmount: 0
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
                <div className={"mt-5"} key={index}>
                    <Input
                        name={"paymentAmount"}
                        value={field.paymentAmount}
                        label={"O'tkazilgan summa"}
                        onChange={(e) => handleMask(e, index)}
                        crossOrigin={undefined}
                    />
                    <div className="">
                        <Radio name={`debt-pay-type-${index}`}
                               value={'transfer'}
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
                    <div
                        className={`flex items-center ${inputFields.length > 1 ? "justify-between" : "justify-center"} mt-2`}>
                        {inputFields.length > 1 && <Button className={"normal-case"} color={"red"}
                                                           onClick={() => handleRemove(index)}>O'chirish</Button>}
                        {inputFields.length === (index + 1) &&
                            <Button className={"normal-case"} color={"green"} onClick={handleAdd}>Qo'shish</Button>}
                    </div>
                </div>
            ))}
            <div className="flex items-center justify-end mt-8">
                <Button color={"green"} onClick={SavePayments} className={"w-full normal-case"}>Saqlash</Button>
            </div>
        </SidebarModal>
    );
}