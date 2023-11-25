const FormInput = ({ label, type, options, required, span, value }) => {
    if (type === "datetime-local" && value) {
        value = value.toISOString().slice(0, value.toISOString().length - 1);
    } else if (type === "date" && value) {
        value = value.toISOString().slice(0, value.toISOString().indexOf("T"));
    }
    return (
        <div
            className={`flex ${
                type !== "checkbox" ? "flex-col" : "justify-between"
            } mb-3 w-[100%] col-span-1 ${span && "lg:col-span-2"}`}
        >
            <label htmlFor={label}>
                {label}
                {required && <span className="text-red-600">*</span>}
                {":"}
            </label>
            {type === "select" ? (
                <select id={label} name={label} required={required} className={`border-solid border-2 border-gray-200 rounded-sm px-1 h-7`}>
                    <option value={""} selected hidden></option>
                    {options.map((x) => {
                        return (
                            <option key={x} value={x} selected={value === x}>
                                {x}
                            </option>
                        );
                    })}
                </select>
            ) : (
                <input
                    id={label}
                    name={label}
                    type={type}
                    required={required}
                    defaultValue={value}
                    className={`border-solid ${
                        type === "file" ? "" : "border-2"
                    } border-gray-200 rounded-sm px-1`}
                />
            )}
        </div>
    );
};

const Form = ({ fields, values, cta, large, medium, onSubmit, children }) => {
    return (
        <div className="flex flex-col bg-gray-100 p-5 rounded-md">
            <form
                // this will be action={onSubmit} when we have a working backend
                onSubmit={onSubmit}
                className={`grid gap-x-1 lg:grid-cols-2 ${
                    large ? "w-96" : medium ? "w-[20.6rem]" : "w-48"
                }`}
            >
                {fields.map((x, i) => {
                    return (
                        <FormInput
                            key={x.id}
                            label={x.label}
                            type={x.type}
                            required={x.required}
                            span={x.span}
                            options={x.options}
                            value={values ? values[x.id] : null}
                        />
                    );
                })}
                <input
                    type="submit"
                    value={cta}
                    className="cursor-pointer bg-black hover:bg-zinc-600 transition-colors text-white w-full rounded-sm p-1 col-span-2"
                ></input>
            </form>
            {children}
        </div>
    );
};

export default Form;
