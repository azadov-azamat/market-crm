import React from 'react';

interface TextInputProps {
    type?: 'text' | 'number' | 'email' | 'password'
    label: string
    value: string | number
    name: string
    placeholder: string
    error?: boolean
    disabled?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({
                                      type = "text",
                                      label,
                                      value,
                                      name,
                                      placeholder,
                                      error = false,
                                      disabled = false,
                                      onChange,
                                  }: TextInputProps) {
    return (
        <div className="input-wrapper w-full">
            {label !== "" && <label htmlFor={label} className={"font-medium text-xs block mb-1"}>{label}</label>}
            <input
                className={"text-base font-normal w-full border border-black/50 rounded-xl px-2 md:py-2 py-1 " +
                    "placeholder:text-sm placeholder:font-normal focus:border-black/50 outline-0"}
                type={type}
                id={label}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
            {error && <p className="error text-red-500 text-xs font-normal mt-1 ml-3">Input filed can't be empty!</p>}
        </div>
    );
}