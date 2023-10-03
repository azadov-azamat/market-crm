
interface TextInputProps {
    label: string
    value?: string | number
    name: string
    placeholder?: string
    error?: boolean
    required?: boolean
    disabled?: boolean
}

export default function TextareaInput({
                                      label,
                                      value,
                                      name,
                                      placeholder,
                                      error = false,
                                      required = false,
                                      disabled = false,
                                  }: TextInputProps) {
    return (
        <div className="input-wrapper w-full">
            {label !== "" && <label htmlFor={label} className={"font-medium text-xs block mb-1"}>{label} {required && "*"}</label>}
            <textarea
                className={"text-base font-normal w-full border border-black/50 rounded-xl px-2 md:py-2 py-1 " +
                    "placeholder:text-sm placeholder:font-normal focus:border-black/50 outline-0"}
                id={label}
                required={required}
                value={value}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <p className="error text-red-500 text-xs font-normal mt-1 ml-3">Input filed can't be empty!</p>}
        </div>
    );
}