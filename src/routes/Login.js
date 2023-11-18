import { Link } from "react-router-dom";
import Form from "../components/Form";

const LoginForm = [
  {
    label: "Username",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    required: true,
  },
];

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5 h-[95vh]">
      <h1 className="text-4xl mb-5 font-bold">
        Welcome to the Flight Booking System.
      </h1>
      <Form
        fields={LoginForm}
        cta="Login"
        onSubmit={() => {
          alert("hey");
        }}
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
