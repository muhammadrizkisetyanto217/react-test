import Botton from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect, useRef } from "react";

const FormRegister = () => {
  const fullname = useRef(null);

  useEffect(() => {
    fullname.current.focus();
  });
  return (
    <div>
      <form action="">
        <InputForm
          label="FullName"
          name="fullname"
          type="fullname"
          placeholder="Insert your fullname"
          children="FullName"
          htmlFor="fullname"
          ref={fullname}
        />
        <InputForm
          label="Email"
          name="email"
          type="email"
          placeholder="email@example.com"
          children="Email"
          htmlFor="email"
        />
        <InputForm
          label="Password"
          name="password"
          type="password"
          placeholder="**********"
          children="Password"
          htmlFor="password"
        />
        <InputForm
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          placeholder="**********"
          children="Password"
          htmlFor="confirmpassword"
        />
      </form>
      {/* <Botton classname="bg-blue-800 w-full">Register</Botton> */}
      <Botton classname="bg-blue-900">Button</Botton>
    </div>
  );
};

export default FormRegister;
