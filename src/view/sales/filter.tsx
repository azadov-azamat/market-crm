import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import SidebarModal from "../../components/modal/sidebar";
import * as InputComponent from "../../components/inputs";
import {Button} from "@material-tailwind/react";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "qs";

export default function FilterSales({toggle, open}: ModalInterfaceProps) {

    const location = useLocation()
    const navigate = useNavigate()
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    return (
        <SidebarModal title={"Ma`lumotlarni filterlash"} open={open} toggle={toggle}>
            <form onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)

                const id = String(data.get("id")) || ""
                const date_apply_from = String(data.get("date_apply_from")) || ""
                const date_apply_to = String(data.get("date_apply_to")) || ""
                const saleMainPrice = String(data.get("saleMainPrice")) || ""
                const saleSoldPrice = String(data.get("saleSoldPrice")) || ""

                let flt = {}
                if (date_apply_from) {
                    flt = {
                        between: JSON.stringify({
                            createdAt: [date_apply_from, date_apply_to]
                        })
                    }
                }

                // if (saleMainPrice || id || saleSoldPrice) {
                //     flt.saleMainPrice = saleMainPrice
                // }

                navigate({
                    search: qs.stringify({
                        ...query,
                        ...flt,
                        filter: JSON.stringify({
                            id, saleMainPrice, saleSoldPrice
                        })
                    })
                })

                // navigate({
                //     search: qs.stringify({
                //         ...query,
                //         search: data.get("clientName")
                //     })
                // })
                toggle()
            }}>

                <InputComponent.Text
                    name={"id"}
                    placeholder={"Savdo ID sini kiriting..."}
                    label={"ID"}
                />

                <InputComponent.Text
                    name={"saleMainPrice"}
                    placeholder={"Belgilangan savdo narxini kiriting..."}
                    label={"  Savdo summasi"}
                />

                <InputComponent.Text
                    name={"saleSoldPrice"}
                    placeholder={"Chegirmadan keyin qo'yilgan narxni kiriting..."}
                    label={" Savdo summasi (chegirma)"}
                />

                <InputComponent.Text
                    type={"date"}
                    name={"date_apply_from"}
                    // placeholder={"Chegirmadan keyin qo'yilgan narxni kiriting..."}
                    label={"Boshlang`ich vaqt"}
                />


                <InputComponent.Text
                    type={"date"}
                    name={"date_apply_to"}
                    // placeholder={"Chegirmadan keyin qo'yilgan narxni kiriting..."}
                    label={"Tugash vaqt"}
                />

                <div className="flex items-center justify-between mt-8">
                    <Button className={"normal-case"} onClick={() => {
                        navigate({search: ""})
                        toggle()
                    }}
                            color={"red"}
                            type={"reset"}>Tozalash</Button>
                    <Button className={"normal-case"} color={"orange"} type={"submit"}>Izlash</Button>
                </div>
            </form>
        </SidebarModal>
    );
}