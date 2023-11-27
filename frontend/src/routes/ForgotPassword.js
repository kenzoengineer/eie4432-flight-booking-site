// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import { POST_FORGOT } from "../js/endpoints";

const SignupForm = [
    {
        id: "username",
        label: "Username",
        type: "text",
        span: true,
        required: true,
    },
    {
        id: "password",
        label: "Password",
        type: "password",
        span: true,
        required: true,
    },
];

const ForgotPassword = () => {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const res = await fetch(POST_FORGOT(), {
                method: "POST",
                body: formData
            });

            const resJson = await res.json();
            if (res.status === 400) {
                alert(resJson.message);
            } else {
                alert(resJson.message);
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center py-5 h-[90vh]">
            <h1 className="text-4xl mb-5 font-bold">
                Forgot Password. 
            </h1>
            <Form
                fields={SignupForm}
                cta="Enter Password"
                onSubmit={onSubmit}
                large
            >
                <div className="mt-2">
                    <Button href={"/login"} text={"Back to Login"} secondary/>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPassword;
