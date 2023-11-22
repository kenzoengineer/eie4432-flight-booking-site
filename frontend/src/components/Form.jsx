const FormInput = ({ label, type, required, span, value }) => {
    if (type === "datetime-local") {
        console.log(value.toISOString());
    }
  return (
    <div className={`flex flex-col mb-3 w-[100%] col-span-1 ${span && "lg:col-span-2"}`}>
      <label htmlFor={label}>
        {label}
        {required && <span className="text-red-600">*</span>}
        {":"}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        required={required}
        defaultValue={type === "datetime-local" ? value.toISOString().slice(0,value.toISOString().length-1) : value}
        className={`border-solid ${
          type === "file" ? "" : "border-2"
        } border-gray-200 rounded-sm px-1`}
      />
    </div>
  );
};

const Form = ({ fields, values, cta, large, onSubmit, children }) => {
  return (
    <div className="flex flex-col bg-gray-100 p-5 rounded-md">
    <form
      onSubmit={onSubmit}
      className={`grid gap-x-1 lg:grid-cols-2 ${
        large ? "w-96" : "w-48"
      }`}
    >
      {fields.map((x,i) => {
        return (
          <FormInput key={x.label} label={x.label} type={x.type} required={x.required} span={x.span} value={values ? values[i] : null}/>
        );
      })}
      <input
        type="submit"
        value={cta}
        className="cursor-pointer bg-black text-white w-full rounded-sm p-1 col-span-2"
      ></input>
    </form>
    {children}
    </div>
  );
};

export default Form;
