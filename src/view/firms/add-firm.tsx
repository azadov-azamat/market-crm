
import {Button} from "@material-tailwind/react";
import * as InputComponent from "../../components/inputs";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {ModalInterfaceProps} from "../../interface/modal/modal.interface.ts";
import DialogModal from "../../components/modal/dialog";
import {createFirm, patchFirm, setFirm} from "../../redux/reducers/firm-currency.ts";

export default function AddFirm({toggle, open}: ModalInterfaceProps) {

    const dispatch = useAppDispatch()
    const {firm} = useAppSelector(state => state.firms)

    const toggleCancel = () => {
        dispatch(setFirm(null))
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
                    if (firm) {
                        dispatch(patchFirm({
                            id: firm?.id,
                            body: {
                                firmINN: Number(data.get("firmINN")),
                                firmName: String(data.get("firmName"))
                            }
                        }))
                    } else {
                        dispatch(createFirm({
                            firmINN: Number(data.get("firmINN")),
                            firmName: String(data.get("firmName"))
                        }))
                    }
                    toggleCancel()
                }}>
             <div className="flex gap-2">
                 <div>
                     <InputComponent.Text
                         name={"firmName"}
                         required
                         defaultValue={firm?.firmName}
                         placeholder={"Korxona nomini kiriting"}
                         label={"Nomi"}/>
                 </div>
                 <div>
                     <InputComponent.Text
                         name={"firmINN"}
                         required
                         type={"number"}
                         defaultValue={firm?.firmINN}
                         placeholder={"Korxona INN kiriting"}
                         label={"INN"}/>
                 </div>
             </div>
                <div className={"flex gap-3 w-full justify-end mt-3"}>
                    <Button type={"reset"} color={"red"}
                            onClick={toggleCancel}
                            className={"normal-case text-xs "}>Bekor qilish</Button>
                    <Button type={"submit"} color={"green"}
                            className={"normal-case text-xs "}>Saqlash</Button>
                </div>
            </form>
        </DialogModal>
    );
}