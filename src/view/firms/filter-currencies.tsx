import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import SidebarModal from "../../components/modal/sidebar";
import * as InputComponent from "../../components/inputs";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";
import {useAppSelector} from "../../redux/hooks.ts";
import ButtonComponent from "../../components/button";

export default function FilterCurrencies({toggle, open}: ModalInterfaceProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    const {firm} = useAppSelector(state => state.firms)

    return (
        <SidebarModal title={"Ma`lumotlarni filterlash"} open={open} toggle={toggle}>
            <form onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)

                const date_apply_from = data.get("date_apply_from")
                const date_apply_to = data.get("date_apply_to")
                const currencyMoney = data.get("currencyMoney")

                let flt = {}
                if (date_apply_from) {
                    flt = {
                        between: JSON.stringify({
                            createdAt: [date_apply_from, date_apply_to]
                        })
                    }
                }

                navigate({
                    search: qs.stringify({
                        ...query,
                        ...flt,
                        search: currencyMoney,
                        filter: JSON.stringify({firmId: firm?.id})
                    })
                })
                toggle()
            }}>
                <InputComponent.Text
                    name={"currencyMoney"}
                    placeholder={"kiritilgan mablag' bo'yiha qidiruv..."}
                    label={"Summa"}
                />

                <InputComponent.Text
                    name={"date_apply_from"}
                    type={"date"}
                    label={"Boshlang`ich vaqt"}
                />
                <InputComponent.Text
                    name={"date_apply_to"}
                    type={"date"}
                    label={"Tugash vaqt"}
                />
                <div className="flex items-center justify-between mt-8 gap-2">
                    <ButtonComponent type={"reset"}
                                     outline
                                     onClick={() => {
                                         navigate({search: ""})
                                         toggle()
                                     }}
                                     className={"text-red border border-red"} label={"Tozalash"}/>
                    <ButtonComponent type={"submit"}
                                     className={"bg-primary"} label={"Saqlash"}/>

                </div>
            </form>
        </SidebarModal>
    );
}