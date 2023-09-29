import React from 'react';

import {Input} from "@material-tailwind/react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

interface PasswordProps {
    name: string
}

export default function Password(
    { name}: PasswordProps
) {

    const [isShow, setShow] = React.useState<boolean>(false)
    const toggleShow = () => setShow(!isShow)

    return (
        <div className={"flex items-center relative"}>
            <Input type={isShow ? 'text' : 'password'} size="lg"
                   name={name}
                   label="Parol" crossOrigin={undefined}
            />
            <div className="absolute right-3 text-xl">
                {
                    !isShow ?
                        <AiOutlineEye onClick={toggleShow} className={"cursor-pointer"}/>
                        :
                        <AiOutlineEyeInvisible onClick={toggleShow} className={"cursor-pointer"}/>
                }
            </div>
        </div>
    );
}