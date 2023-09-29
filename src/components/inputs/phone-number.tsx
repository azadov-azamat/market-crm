import React from 'react';

import {Input} from "@material-tailwind/react";
import {handleNumberMask} from "../../config/servise.ts";

interface PhoneNumberProps {
    name: string
}

export default function PhoneNumber({name}: PhoneNumberProps) {

    const [nmb, setNmb] = React.useState<number>(998)

    return (
        <Input crossOrigin={undefined} size="lg" name={name} label="Telefon Raqam" value={nmb}
               onChange={event => setNmb(Number(handleNumberMask(event.target.value)))} maxLength={12} minLength={3}/>
    );
}