// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Form from "../components/Form";
import { POST_REGISTER } from "../js/endpoints";

const SignupForm = [
    {
        id: "username",
        label: "Username",
        type: "text",
        span: true,
        required: true,
    },
    {
        id: "email",
        label: "Email",
        type: "email",
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
    {
        id: "gender",
        label: "Gender",
        type: "text",
        span: true,
        required: true,
    },
    {
        id: "birthdate",
        label: "Birthday",
        type: "date",
        span: false,
        required: true,
    },
    {
        id: "profile_pic",
        label: "Profile Picture (Link)",
        type: "text",
        span: false,
        required: true,
    },
];

const Signup = () => {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const res = await fetch(POST_REGISTER(), {
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
                Create an Account With Us.
            </h1>
            <Form
                fields={SignupForm}
                cta="Sign Up!"
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

export default Signup;
