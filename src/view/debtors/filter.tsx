import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import SidebarModal from "../../components/modal/sidebar";
import * as InputComponent from "../../components/inputs";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";
import ButtonComponent from "../../components/button";

export default function FilterDebts({toggle, open}: ModalInterfaceProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    return (
        <SidebarModal title={"Ma`lumotlarni filterlash"} open={open} toggle={toggle}>
            <form onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)

                navigate({
                    search: qs.stringify({
                        ...query,
                        search: data.get("clientName")
                    })
                })
                toggle()
            }}>
                <InputComponent.Text
                    name={"clientName"}
                    placeholder={"Ismi yoki telefon raqami bo'yiha qidiruv..."}
                    label={" Ismi/telefon raqami"}
                />
                <div className="flex items-center justify-between mt-8 gap-3">
                    <ButtonComponent label={"Tozalash"} className={"border border-yellow "}
                                     outline onClick={() => {
                        navigate({search: ""})
                        toggle()
                    }}/>
                    <ButtonComponent label={"Saqlash"}
                                     className={"bg-primary"}
                                     type={"submit"}/>
                </div>
            </form>
        </SidebarModal>
    );
}