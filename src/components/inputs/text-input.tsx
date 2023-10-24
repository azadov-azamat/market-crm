import React from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useAppSelector} from "../../redux/hooks.ts";

interface TextInputProps {
    type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'textarea' | 'phone'
    label: string
    value?: string | number
    name: string;
    maxLength?: number;
    placeholder?: string;
    defaultValue?: string | number | undefined;
    error?: boolean
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({
                                      type = "text",
                                      label,
                                      value,
                                      name,
                                      placeholder,
    defaultValue,
    maxLength,
                                      error = false,
                                      required = false,
                                      disabled = false,
                                      readOnly = false,
                                      onChange,
                                  }: TextInputProps) {

    const {uz} = useAppSelector(state => state.variables)
    const [isShow, setShow] = React.useState<boolean>(false)
    const toggleShow = () => setShow(!isShow)

    return (
        <div className="input-wrapper w-full">
            {label !== "" &&
                <label htmlFor={label} className={"font-medium text-xs block mb-1"}>{label} {required && "*"}</label>}
            <div className="flex items-center relative">
                {type === 'phone' &&
                    <div className={"border border-black text-black rounded-l-xl px-2 md:py-2 py-1 border-r-0"}>+{uz}</div>}
                <input
                    className={`text-black text-base font-normal w-full border border-black 
                    ${type === 'phone' ? "rounded-r-xl" : "rounded-xl"} px-2 md:py-2 py-1
                    focus:border-black outline-0 placeholder:text-black/50 md:placeholder:text-sm placeholder:text-sm placeholder:font-medium`}
                    type={isShow ? 'text' : type}
                    id={label}
                    readOnly={readOnly}
                    required={required}
                    defaultValue={defaultValue}
                    value={value}
                    name={name}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="absolute right-3 text-xl">
                    {
                        type === 'password' ? !isShow ?
                            <AiOutlineEye onClick={toggleShow} className={"cursor-pointer"}/>
                            :
                            <AiOutlineEyeInvisible onClick={toggleShow} className={"cursor-pointer"}/>
                    : ''}
                </div>
            </div>
            {error && <p className="error text-red text-xs font-normal mt-1 ml-3">Input filed can't be empty!</p>}
        </div>
    );
}