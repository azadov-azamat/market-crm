import React from 'react';
import {Button} from "@material-tailwind/react";
import {BiLoader} from "react-icons/bi";

interface TextInputProps {
    type?: 'submit' | 'reset' | 'button';
    label: string
    className?: string | number
    disabled?: boolean
    loading?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonComponent({
                                            type = "button",
                                            label,
                                            className,
                                            disabled = false,
                                            onClick,
                                            loading = false,
                                        }: TextInputProps) {


    return (
        <div className="input-wrapper w-full">
            <Button
                className={`${className} flex items-center justify-center 
                gap-2 normal-case bg-primary`}
                type={type} fullWidth
                onClick={onClick}
                disabled={disabled}
            >
                {label}
                {
                    loading && <>
                        <BiLoader className={"text-white text-base animate-spin"}/>
                    </>
                }
            </Button>
        </div>
    );
}