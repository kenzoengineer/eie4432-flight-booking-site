const FilterField = ({ label, type }) => {
    return (
        <div className="bg-gray-100 rounded-md flex border border-gray-300 w-min">
            <div className="px-3 py-1 border-r border-gray-300 text-gray-500">
                <label for={label}>{label}</label>
            </div>
            {/* <div className="border-solid border-l border-gray-800"> */}
                <input
                    id={label}
                    name={label}
                    type={type}
                    className="px-1 rounded-r-md"
                ></input>
            {/* </div> */}
        </div>
    );
};

const Filter = ({ filters, filterFn }) => {

    const onFormChange = (x) => {
        let output = {};
        const data = new FormData(document.querySelector('form'));
        data.forEach((value, key) => output[key] = value);
        filterFn(output);
    }

    return (
        <form onChange={onFormChange}>
            {filters.map((x) => {
                return <FilterField label={x.label} type={x.type} />;
            })}
        </form>
    );
};

export default Filter;
