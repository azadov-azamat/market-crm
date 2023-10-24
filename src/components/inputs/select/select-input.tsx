
import Select, {ActionMeta, SingleValue} from "react-select";
import React from "react";
import './select.scss'

interface SelectInputProps {
    label?: string | ""
    optionLabel: string
    optionValue: string
    placeholder?: string
    value?: string | number;
    error?: boolean
    name: string
    required?: boolean
    disabled?: boolean
    options: any | []
    defaultValue?: any;
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onChange?: ((newValue: SingleValue<React.FocusEvent<HTMLInputElement, Element>>, actionMeta: ActionMeta<React.FocusEvent<HTMLInputElement, Element>>) => void) | undefined
}

export default function SelectInput({
                                        label,
                                        required,
                                        disabled,
                                        name,
                                        onFocus,
                                        options,
                                        onChange,
                                        optionLabel,
                                        placeholder,
                                        defaultValue,
                                        optionValue
                                    }: SelectInputProps) {
    return (
        <div className="input-wrapper w-full">
            {label !== "" &&
                <label htmlFor={name} className={"font-medium text-xs block mb-1"}>{label} {required && "*"}</label>}
            <Select
                id={name}
                name={name}
                onFocus={onFocus}
                placeholder={placeholder}
                options={options}
                isDisabled={disabled}
                defaultValue={defaultValue}
                className={"border-none"}
                getOptionLabel={option => {
                    // @ts-ignore
                    return option[optionLabel];
                }}
                getOptionValue={option => {
                    // @ts-ignore
                    return option[optionValue];
                }}
                onChange={onChange}
            />
        </div>
    );
}