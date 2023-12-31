// Ken Jiang - 23012932X | Anson Yuen - 23012962X
const FormInput = ({ formId, label, type, options, required, span, value }) => {
    return (
        <div
            className={`flex ${
                type !== "checkbox" ? "flex-col" : "justify-between"
            } mb-3 w-[100%] col-span-1 ${span && "lg:col-span-2"}`}
        >
            <label htmlFor={formId}>
                {label}
                {required && <span className="text-red-600">*</span>}
                {":"}
            </label>
            {type === "select" ? (
                <select id={formId} name={formId} required={required} defaultValue={value} className={`border-solid border-2 border-gray-200 rounded-sm px-1 h-7`}>
                    <option value={""} hidden></option>
                    {options.map((x, i) => {
                        return (
                            <option key={i} value={x}>
                                {x}
                            </option>
                        );
                    })}
                </select>
            ) : (
                <input
                    id={formId}
                    name={formId}
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
                onSubmit={onSubmit}
                className={`max-lg:flex flex-col lg:grid gap-x-1 lg:grid-cols-2 ${
                    large ? "w-96" : medium ? "w-[20.6rem]" : "w-48"
                }`}
            >
                {fields.map((x, i) => {
                    return (
                        <FormInput
                            key={i}
                            formId={x.id}
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
