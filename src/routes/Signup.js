import Form from "../components/Form";

const SignupForm = [
  {
    label: "Username",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    type: "email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    required: true,
  },
  {
    label: "Nickname",
    type: "text",
    required: true,
  },
  {
    label: "Gender",
    type: "text",
    required: true,
  },
  {
    label: "Birthday",
    type: "date",
    required: true,
  },{
    label: "Profile Picture",
    type: "file",
    required: true,
  },
];

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5 h-[95vh]">
      <h1 className="text-4xl mb-5 font-bold">Create an Account With Us.</h1>
      <Form
        fields={SignupForm}
        cta="Sign Up!"
        onSubmit={() => {
          alert("hey");
        }}
        large
      />
    </div>
  );
};

export default Signup;
