import * as InputComponent from "../../components/inputs";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import DialogModal from "../../components/modal/dialog";
import {createCurrency, patchCurrency, setCurrency} from "../../redux/reducers/firm-currency.ts";
import ButtonComponent from "../../components/button";

export default function AddCurrency({toggle, open}: ModalInterfaceProps) {

    const dispatch = useAppDispatch()
    const {currency, firm} = useAppSelector(state => state.firms)

    const toggleCancel = () => {
        dispatch(setCurrency(null))
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
                    const data = new FormData(e.currentTarget)
                    if (currency) {
                        dispatch(patchCurrency({
                            id: currency?.id,
                            body: {
                                currencyMoney: Number(data.get("currencyMoney")),
                                currencyOption: String(data.get("currencyOption"))
                            }
                        }))
                    } else {
                        dispatch(createCurrency({
                            currencyMoney: Number(data.get("currencyMoney")),
                            currencyOption: String(data.get("currencyOption")),
                            firmId: firm?.id || 0
                        }))
                    }
                    toggleCancel()
                }}>
                <div className="flex gap-2">
                    <div>
                        <InputComponent.Text
                            name={"currencyMoney"}
                            required
                            type={"number"}
                            defaultValue={currency?.currencyMoney}
                            placeholder={"Mablag' kiriting"}
                            label={"Mablag'"}/>
                    </div>
                    <div>
                        <InputComponent.Text
                            name={"currencyOption"}
                            required
                            defaultValue={currency?.currencyOption}
                            placeholder={"Izoh kiriting"}
                            label={"Izoh"}/>
                    </div>
                </div>
                <div className={"flex gap-3 w-full justify-end mt-3"}>
                    <ButtonComponent type={"reset"}
                                     outline
                                     onClick={toggleCancel}
                                     className={"text-red border border-red"} label={"Bekor qilish"}/>
                    <ButtonComponent type={"submit"}
                                     className={"bg-primary"} label={"Saqlash"}/>
                </div>
            </form>
        </DialogModal>
    );
}