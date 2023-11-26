import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { POST_LOGIN } from "../js/endpoints";

const LoginForm = [
  {
    id: "username",
    label: "Username",
    span: true,
    type: "text",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    span: true,
    type: "password",
    required: true,
  },
  {
    id: "remember",
    label: "Remember me",
    span: true,
    type: "checkbox",
    required: false,
  },
];

const Login = () => {
    const navigate = useNavigate();
  const onSubmit = async (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    try {
        const res = await fetch(POST_LOGIN(),{
            method: "POST",
            body: formData
        });
        const resJson = await res.json();
        if (res.status === 400) {
            alert(resJson.message);
            return;
        }
        if (e.target[2].checked) {
            localStorage.setItem("user", JSON.stringify({
                userId: resJson.userId,
                messages: resJson.messages,
                isAdmin: formData.get("username") === "admin",
            }));
        } else {
            sessionStorage.setItem("user", JSON.stringify({
                userId: resJson.userId,
                messages: resJson.messages,
                isAdmin: formData.get("username") === "admin",
            }));
        }
        navigate("/flights");
    } catch (err) {
        console.error(err);
    }
    e.target[0].value = "";
    e.target[1].value = "";
    return true;
  }
    return (
    <div className="flex flex-col justify-center items-center py-5 h-[90vh]">
      <h1 className="text-4xl mb-5 font-bold text-center">
        Welcome to the Flight Booking System.
      </h1>
      <Form
        fields={LoginForm}
        cta="Login"
        onSubmit={onSubmit}
      >
        <div className="text-gray-400 underline text-sm flex justify-center gap-x-2 mt-2">
          <Link to={"/signup"}>Sign Up</Link>
          <div>Forgot Password?</div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
