import Button from "./Button";

const FORM_ID = "FilterForm"

const FilterField = ({ label, type, options }) => {
    return (
        <div className="bg-gray-100 rounded-md flex border border-gray-300 w-min">
            <div className="px-3 py-1 border-r border-gray-300 text-gray-500">
                <label for={label}>{label}</label>
            </div>
            {type === "select" ? (
                <select id={label} name={label} className="px-1 rounded-r-md">
                    <option value="" selected hidden></option>
                    {options.map((x) => {
                        return (
                            <option key={x} value={x}>
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
                    className="px-1 rounded-r-md"
                />
            )}
        </div>
    );
};

const Filter = ({ filters, filterFn }) => {
    const onFormChange = () => {
        let output = {};
        const data = new FormData(document.querySelector("form"));
        data.forEach((value, key) => (output[key] = value));
        filterFn(output);
    };

    return (
        <form id={FORM_ID} onChange={onFormChange}>
                <div className="flex justify-between">
                    <div className="flex gap-x-2 ">
                    {filters.map((x) => { //                        ^ will set filters to an empty object
                        return (
                            <FilterField
                                label={x.label}
                                type={x.type}
                                options={x.options}
                            />
                        );
                    })}
                    </div>
                    <Button text={"Reset"} onClick={() => {document.querySelector(`#${FORM_ID}`).reset(); filterFn({});}} secondary/>
                </div>
            </form>
    );
};

export default Filter;
