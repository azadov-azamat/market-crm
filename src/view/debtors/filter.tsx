
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import SidebarModal from "../../components/modal/sidebar";
import * as InputComponent from "../../components/inputs";
import {Button} from "@material-tailwind/react";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";

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
                <div className="flex items-center justify-between mt-8">
                    <Button className={"normal-case"} onClick={() => {
                        navigate({search: ""})
                        toggle()
                    }}
                            color={"red"}
                            type={"reset"}>Tozalash</Button>
                    <Button className={"normal-case"} color={"orange"} type={"submit"}>Saqlash</Button>
                </div>
            </form>
        </SidebarModal>
    );
}