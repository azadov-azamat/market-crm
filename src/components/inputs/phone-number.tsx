import React from 'react';

import {Input} from "@material-tailwind/react";
import {handleNumberMask} from "../../config/servise.ts";

interface PhoneNumberProps {
    setState?: any;
}

export default function PhoneNumber({setState}: PhoneNumberProps) {

    const [nmb, setNmb] = React.useState<number>(998)

    return (
        <Input crossOrigin={undefined} size="lg" label="Telefon Raqam" value={nmb} onChange={event => {
            setNmb(Number(handleNumberMask(event.target.value)))
            setState(`${handleNumberMask(event.target.value)}`)
        }} maxLength={12} minLength={3}/>
    );
}