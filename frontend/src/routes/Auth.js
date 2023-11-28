import { useEffect, useState } from "react"
import { BASE } from "../js/endpoints"
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    useEffect(() => {
        const auth = async() => {
            const res = await fetch(BASE());
            if (res.status === 200) {
                navigate("/login");
            } else {
                setMessage((await res.json()).message);
            }
        }
        auth();
    },[window.location.search]);
    return <div>
        {message}
    </div>
}

export default Auth;