const Field = ({label, children}) => {
    return (
        <div className="flex flex-col">
            <p className="text-sm text-zinc-400 -mb-1">{label}</p>
            <p className="font-semibold text-lg">{children}</p>
        </div>
    );
}

const Ticket = ({name, dest, date, time, seat}) => {
    return (
    <div className="w-[50em] h-72 border-2 border-black rounded-md flex flex-col justify-between">
        <div className="w-full bg-black py-2 px-5">
            <h1 className="text-white font-bold text-xl uppercase italic">Flight Booking System &copy;</h1>
        </div>
        <div className="flex items-center justify-between">
            <div className="w-44 ml-5 absolute opacity-5">
                <img src="/imgs/airplane_logo.svg" alt="logo"/>
            </div>
            <div className="grid grid-cols-2 ml-14">
                <div className="text-5xl font-bold col-span-2">
                    {`// HKG ➔ ${dest}`}
                </div>
                <Field label={"Passenger"}>{name}</Field>
                <Field label={"Seat"}>{seat}</Field>
                <Field label={"Date"}>{date}</Field>
                <Field label={"Time"}>{time}</Field>
                <Field label={"Terminal"}>01</Field>
                <Field label={"Gate"}>61</Field>
            </div>
            <div className="w-52 mr-14">
                <img src="/imgs/qr.png" alt="qr_code"/>
            </div>
        </div>
        <div className="border-y-8 border-black h-5 mb-1">
        </div>
    </div>
    );
}

export default Ticket;