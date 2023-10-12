import React, {useEffect} from 'react';
import SidebarModal from "../../components/modal/sidebar";
import {Button, Radio} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import {ClientDataProps, DebtorDataProps} from "../../interface/redux/variable.interface.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {createClient, createDebt, getClients, setDebtorData, setMixedPayList} from "../../redux/reducers/variable.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import {formatter, getMgId, handleNumberMask, handleSwitchPayType} from "../../config/servise.ts";
import {toast} from "react-toastify";
import {MixedPaySidebar} from "./mixed-pay-sidebar.tsx";
import {unwrapResult} from "@reduxjs/toolkit";

interface DebtorModalProps extends ModalInterfaceProps {
    totalPrice: number;
    debtUser?: ClientDataProps | null
}

export function DebtorSidebar({open, toggle, totalPrice, debtUser}: DebtorModalProps) {

    const dispatch = useAppDispatch()

    const {clients, mixedPay} = useAppSelector(state => state.variables)

    const [phone, setPhone] = React.useState("")
    const [gvnPrice, setGvnPrice] = React.useState("")
    const [isOther, setOther] = React.useState<boolean>(false)
    const [isMixed, setMixed] = React.useState<boolean>(false)

    const uz = '+998'
    const toggleMixed = (bool: boolean) => setMixed(bool)

    const setArrayToggle = (payTy: string) => {
        toggleMixed(false)
        dispatch(setMixedPayList([
            {paymentAmount: Number(gvnPrice), paymentType: payTy, storeId: getMgId()}
        ]))
    }

    useEffect(() => {
        if (gvnPrice !== "") {
            dispatch(setMixedPayList([
                {paymentAmount: Number(gvnPrice), paymentType: "transfer", storeId: getMgId()}
            ]))
        }
    }, [gvnPrice]);

    return (
        <SidebarModal title={"Qarz savdo"} open={open} toggle={toggle}>
            <form onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)

                if (debtUser) {
                    const debtData: DebtorDataProps = {
                        storeId: Number(getMgId()),
                        clientId: debtUser?.id || 0,
                        debt: Number(gvnPrice)
                    }
                    dispatch(createDebt(debtData)).then(unwrapResult)
                        .then(() => {
                            toast.success("Saqlandi")
                            toggle()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    if (isOther) {
                        const client: ClientDataProps = {
                            clientName: String(data.get("clientName")),
                            clientAdress: String(data.get("clientAdress")),
                            clientPhone: uz + phone,
                            clientPaymentDate: String(data.get("clientPaymentDate")),
                        }
                        dispatch(createClient(client)).then(unwrapResult)
                            .then((r) => {
                                dispatch(setDebtorData(r.data))
                            })
                    }
                    toggle()
                }
            }}
                  className="flex flex-col gap-3"
            >

                {!debtUser ? <>
                    <div
                        className='text-center text-sm border bg-black/30 text-white rounded-xl py-1'>{formatter.format(totalPrice)}
                    </div>
                    {isOther ? <>
                            <div className="text-sm text-center text-white bg-black/20 py-0.5 rounded-xl cursor-pointer"
                                 onClick={() => setOther(false)}>
                                Mijozlardan birini tanlash
                            </div>
                            <InputComponent.Text
                                name={"clientName"}
                                required={isOther}
                                placeholder={"Qarzga oluvchi ism sharifi"}
                                label={"Qarzdor F.I.O"}
                            />

                            <InputComponent.Text
                                name={"clientAdress"}
                                required={isOther}
                                placeholder={"Qarzga oluvchi manzili"}
                                label={"Manzilni kiriting"}
                            />
                            <InputComponent.Text
                                name={"clientPhone"}
                                required={isOther}
                                type={'phone'}
                                value={phone}
                                onChange={event => setPhone(handleNumberMask(event.target.value))}
                                placeholder={"Qarzga oluvchi telefon raqami"}
                                label={"Telefon kiriting"}
                            />

                            <InputComponent.Text
                                name={"clientPaymentDate"}
                                required={isOther}
                                type={"date"}
                                placeholder={"Qarz qaytarilish sanasi"}
                                label={"To'lov qilish sanasi"}
                            />
                        </> :
                        <InputComponent.Select
                            name="clientId"
                            required={!isOther}
                            label={"Mijozlar"}
                            placeholder="Mijozlardan birini tanlang..."
                            options={[{id: null, clientName: "Boshqa"}, ...clients]}
                            optionLabel={"clientName"}
                            optionValue={"id"}
                            onFocus={() => {
                                dispatch(getClients({}))
                            }}
                            onChange={(e) => {
                                // @ts-ignore
                                if (e["id"] === null) {
                                    setOther(true)
                                    dispatch(setDebtorData(null))
                                } else {
                                    // @ts-ignore
                                    dispatch(setDebtorData(e))
                                    setOther(false)
                                }
                            }
                            }
                        />
                    }
                </> : <>
                    <div
                        className='text-center text-sm border bg-black/30 text-white rounded-xl py-1'>{debtUser?.clientName} uchun
                        to'lov
                    </div>
                </>
                }

                <InputComponent.Text
                    name={"paidSum"}
                    value={gvnPrice}
                    onChange={e => {
                        const num = e.target.value
                        if (debtUser) {
                            setGvnPrice(handleNumberMask(num))
                        } else {
                            if (totalPrice >= Number(num)) {
                                setGvnPrice(handleNumberMask(num))
                            } else {
                                toast.warning("Umumiy narxdan oshmasligi kerak")
                            }
                        }
                    }}
                    placeholder={"To'lov qilmoqchi bo'lgan summa"}
                    label={"Beriladigan pul"}
                />

                {gvnPrice !== "" && <div className="">
                    <label htmlFor={"transfer"} className={"font-medium text-xs block mb-1"}>To'lov turini tanlang
                        *</label>
                    <div className="grid md:grid-cols-4 grid-cols-2">
                        <Radio id={"transfer"} name={"debt-pay-type"}
                               required
                               onClick={() => setArrayToggle("transfer")}
                               value={'transfer'}
                               defaultChecked
                               label={<img
                                   className={"md:w-14 w-16"}
                                   src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                                   alt="transfer"/>} crossOrigin={undefined}
                        />
                        <Radio name={"debt-pay-type"}
                               value={"naqd"}
                               required
                               onClick={() => setArrayToggle("naqd")}
                            // defaultChecked={debtor?.payType === "naqd"}
                               label={<img
                                   className={"md:w-14 w-16 rounded-full"}
                                   src="https://storage.kun.uz/source/3/Qwj26y2xYpIVcRcX6sbU1XN7X_FHVBlr.jpg"
                                   alt="naqd"/>} crossOrigin={undefined}
                        />
                        <Radio name={"debt-pay-type"}
                               value={"terminal"} required
                               onClick={() => setArrayToggle("terminal")}
                            // defaultChecked={debtor?.payType === "terminal"}
                               label={<img
                                   className={"md:w-14 w-16"}
                                   src="https://ru.ipakyulibank.uz/uploads/images/widget/2021/09/widget_1632922827_4049.png"
                                   alt="terminal"/>} crossOrigin={undefined}
                        />
                        <Radio name={"debt-pay-type"}
                               value={"mixed-pay"} required
                               onClick={() => toggleMixed(true)}
                               label={<img
                                   className={"md:w-14 w-16 rounded-full"}
                                   src="https://www.pngitem.com/pimgs/m/509-5093697_payment-png-transparent-png.png"
                                   alt="terminal"/>} crossOrigin={undefined}
                        />
                    </div>
                </div>
                }
                {gvnPrice !== "" && <div className="px-2 py-1">
                    <div className={"flex flex-col w-full"}>
                        <div className={"w-full flex justify-between items-center"}>
                            <div className={"text-sm font-bold w-1/12"}>№</div>
                            <div className={"text-sm font-bold w-5/12"}>To'lov summasi</div>
                            <div className={"text-sm font-bold w-6/12"}>To'lov turi</div>
                        </div>

                        {
                            mixedPay.map((item, ind) => <div
                                className={"w-full flex justify-between py-1 border-b"} key={ind}>
                                <div className={"text-sm w-1/12`"}>{ind + 1}</div>
                                <div className={"text-sm pl-5 w-5/12"}>{formatter.format(item.paymentAmount)}</div>
                                <div
                                    className={"text-sm w-6/12"}>{handleSwitchPayType(item.paymentType)}</div>
                            </div>)
                        }
                    </div>
                </div>}
                <div className="flex items-center justify-between mt-8">
                    <Button className={"normal-case"} onClick={toggle} color={"red"} type={"reset"}>Bekor
                        qilish</Button>
                    <Button className={"normal-case"} color={"orange"} type={"submit"}>Saqlash</Button>
                </div>
            </form>
            {isMixed &&
                <MixedPaySidebar open={isMixed} toggle={() => setMixed(!isMixed)} totalPrice={Number(gvnPrice)}/>}
        </SidebarModal>
    );
}