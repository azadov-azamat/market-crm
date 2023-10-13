import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import SidebarModal from "../../components/modal/sidebar";
import * as InputComponent from "../../components/inputs";
import {Button} from "@material-tailwind/react";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";

export default function FilterFirms({toggle, open}: ModalInterfaceProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    return (
        <SidebarModal title={"Ma`lumotlarni filterlash"} open={open} toggle={toggle}>
            <form onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)

                const date_apply_from = data.get("date_apply_from")
                const date_apply_to = data.get("date_apply_to")
                const firmName = data.get("firmName")
                const firmINN = data.get("firmINN")

                let flt = {}
                if (date_apply_from) {
                    flt = {
                        between: JSON.stringify({
                            createdAt: [date_apply_from, date_apply_to]
                        })
                    }
                }
                if (firmINN) {
                    flt = {
                        filter: JSON.stringify({
                            firmINN: firmINN
                        })
                    }
                }
                navigate({
                    search: qs.stringify({
                        ...query,
                        ...flt,
                        search: firmName
                    })
                })
                toggle()
            }}>
                <InputComponent.Text
                    name={"firmName"}
                    placeholder={"Korxona nomi bo'yiha qidiruv..."}
                    label={"Korxona nomi"}
                />
                <InputComponent.Text
                    name={"firmINN"}
                    placeholder={"Korxona INN bo'yiha qidiruv..."}
                    label={"Korxona INN"}
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