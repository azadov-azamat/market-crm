import React from 'react';

interface TextInputProps {
    type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'textarea' | 'phone'
    label: string
    value?: string | number
    name: string
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
                                      error = false,
                                      required = false,
                                      disabled = false,
                                      readOnly = false,
                                      onChange,
                                  }: TextInputProps) {
    return (
        <div className="input-wrapper w-full">
            {label !== "" &&
                <label htmlFor={label} className={"font-medium text-xs block mb-1"}>{label} {required && "*"}</label>}
            <div className="flex items-center">
                {type === 'phone' &&
                    <div className={"border border-black/50 rounded-l-xl px-2 md:py-2 py-1"}>+998</div>}
                <input
                    className={`text-base font-normal w-full border border-black/50 ${type === 'phone' ? "rounded-r-xl" : "rounded-xl"} px-2 md:py-2 py-1
                     placeholder:text-sm placeholder:font-normal focus:border-black/50 outline-0`}
                    type={type}
                    id={label}
                    readOnly={readOnly}
                    required={required}
                    defaultValue={defaultValue}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
            {error && <p className="error text-red-500 text-xs font-normal mt-1 ml-3">Input filed can't be empty!</p>}
        </div>
    );
}