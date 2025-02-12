import { Fragment, useEffect, useRef, useState } from "react";
import Botton from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth.service";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    //* Untuk simpan data di localstorage
    // localStorage.setItem("email", event.target.email.value);
    // localStorage.setItem("password", event.target.password.value);
    // window.location.href = "/product";
    // console.log(event.target.email.value);
    // console.log(event.target.password.value);
    // console.log("Login");

    //* Panggil data dari login api
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    console.log(data);

    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        console.log(res, "dari form login");
        window.location.href = "/product";
      } else {
        setLoginFailed(res.response.data);
        console.log(res, "dari form login");
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  });

  return (
    <Fragment>
      <div>
        <form onSubmit={handleLogin}>
          {/* Error Massage  */}
          {loginFailed && (
            <p className="text-red-500 text-left mb-5">{loginFailed}</p>
          )}
          <InputForm
            //   label="username"
            name="username"
            type="text"
            placeholder="Johon Doe"
            children="Username"
            htmlFor="username"
            ref={usernameRef}
            // id="username"
          />
          <InputForm
            //   label="Password"
            name="password"
            //   type="password"
            placeholder="******"
            children="Password"
            htmlFor="password"
            // id="password"
          />
          <Botton classname="bg-blue-900 w-full" type="submit">
            Login
          </Botton>
        </form>
      </div>
    </Fragment>
  );
};

export default FormLogin;
