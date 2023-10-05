import React from 'react';
import {AiOutlineFileImage} from "react-icons/ai";
import {BiXCircle} from "react-icons/bi";
import {useAppDispatch} from "../../redux/hooks.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {uploadFileServer} from "../../redux/reducers/file.ts";
import {toast} from "react-toastify";

interface FileInputProps {
    // label: string
    // value?: string | number
    name: string
    // placeholder: string
    // required?: boolean
    // disabled?: boolean
    // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FileInput({name}: FileInputProps) {

    const dispatch = useAppDispatch()
    const [image, setImage] = React.useState<string>("")
    const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>

    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        setFileSelected(fileList[0]);
        const data = new FormData()
        data.append("file", fileList[0])
        dispatch(uploadFileServer(data)).then(unwrapResult)
            .then(e => {
                setImage(e?.url);
            })
            .catch(err => {
                console.log(err)
                toast.error("Yuklashda xatolik, qayta urinib ko'ring")
            })
    };

    const uploadFile = function (
        // e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) {
        if (fileSelected) {
            const formData = new FormData();
            formData.append("image", fileSelected, fileSelected.name);
            const data = new FormData()
            data.append("file", fileSelected)
            dispatch(uploadFileServer(data)).then(unwrapResult)
                .then(e => {
                    setImage(e?.url);
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Yuklashda xatolik, qayta urinib ko'ring")
                })
        }
    };

    return (
        <div>
            <label htmlFor="photo">
                <input
                    accept="image/*"
                    style={{display: "none"}}
                    id="photo"
                    // name={name}
                    type="file"
                    multiple={false}
                    onChange={handleImageChange}
                />
                <input type="text" value={image} style={{display: "none"}} name={name}/>
                {
                    image !== "" ? <div className={"relative w-32 h-32"}>
                            <img src={image} alt={image} className={"w-full object-center object-contain"}/>
                            <BiXCircle onClick={() => {
                                setImage("")
                            }}
                                       className={"text-2xl absolute -top-2 -right-2 text-red-500 cursor-pointer"}/>
                        </div>
                        :
                        <span
                            className={"border border-black/50 w-32 h-32 flex flex-col items-center justify-center cursor-pointer"}
                            onClick={uploadFile}
                        >
                    <AiOutlineFileImage className={"text-3xl mb-3"}/>
                    Rasm yuklash
                </span>
                }
            </label>
        </div>
    );
}