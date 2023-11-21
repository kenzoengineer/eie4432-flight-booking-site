import Form from "../components/Form";

const SignupForm = [
  {
    label: "Username",
    type: "text",
    span: true,
    required: true,
  },
  {
    label: "Email",
    type: "email",
    span: true,
    required: true,
  },
  {
    label: "Password",
    type: "password",
    span: true,
    required: true,
  },
  {
    label: "Nickname",
    type: "text",
    span: true,
    required: true,
  },
  {
    label: "Gender",
    type: "text",
    span: true,
    required: true,
  },
  {
    label: "Birthday",
    type: "date",
    span: false,
    required: true,
  },{
    label: "Profile Picture",
    type: "file",
    span: false,
    required: true,
  },
];

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5 h-[90vh]">
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
