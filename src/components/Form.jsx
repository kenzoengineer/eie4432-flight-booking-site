const FormInput = ({ label, type, required }) => {
  return (
    <div className="flex flex-col mb-3 w-[100%]">
      <label for={label}>
        {label}
        {required && <span className="text-red-600">*</span>}
        {":"}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        required={required}
        className={`border-solid ${
          type === "file" ? "" : "border-2"
        } border-gray-200 rounded-sm px-1`}
      />
    </div>
  );
};

const Form = ({ fields, cta, large, onSubmit, children }) => {
  return (
    <div className="flex flex-col bg-gray-100 p-5 rounded-md">
    <form
      onSubmit={onSubmit}
      className={`flex flex-col items-center ${
        large ? "w-96" : "w-48"
      }`}
    >
      {fields.map((x) => {
        return (
          <FormInput label={x.label} type={x.type} required={x.required} />
        );
      })}
      <input
        type="submit"
        value={cta}
        className="cursor-pointer bg-black text-white w-full rounded-sm p-1"
      ></input>
    </form>
    {children}
    </div>
  );
};

export default Form;
