import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import FormInput from "../common/FormInput";

const initialValue = {
  email: "",
  password: "",
};

const initialMsg = {
  msgEmail: "",
  msgPassword: "",
};

const Login = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState(initialMsg);

  const [repo, setRepo] = useState([]);

  const { email, password } = userInfo;
  const { msgEmail, msgPassword } = errorMsg;

  const isValidateEmail = validateEmail(email.trim());
  const isValidatePassword = validatePassword(password);

  // fetch data localhost
  useEffect(() => {
    axios
      .get("http://localhost:5005/user")
      .then((response) => {
        let user = response.data;
        setRepo(user);
      })
      .catch((error) => {
        alert("error fetch data", error);
      });
  }, []);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function validatePassword(password) {
    var validCharactersRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return validCharactersRegex.test(password);
  }
  function checkInputEmail(email) {
    if (!email) {
      setErrorMsg({ ...errorMsg, msgEmail: "Please enter email" });
      return 1;
    } else if (!isValidateEmail) {
      setErrorMsg({ ...errorMsg, msgEmail: "Invalid email" });
      return 1;
    }
  }
  function checkInputPassword(password) {
    if (!password) {
      setErrorMsg({ ...errorMsg, msgPassword: "Please enter password" });
      return 1;
    } else if (!isValidatePassword) {
      setErrorMsg({
        ...errorMsg,
        msgPassword:
          "Invalid password. Should contain at least one digit, one lower case, one upper case, 8 characters.",
      });
      return 1;
    }
  }
  function checkLogin(inpEmail, inpPassword) {
    return repo.find(
      ({ email, password }) => email === inpEmail && password === inpPassword
    );
  }

  const _handleSubmit = async () => {
    checkInputEmail(email);
    checkInputPassword(password);
  
    await axios
      .post("http://localhost:5005/login", userInfo)
      .then((response) => {
        localStorage.setItem("tokenLogin", response.data);
        alert("login successfully");
        history.push("/");
      })
      .catch((error) => {
        alert("error send data", error);
      });
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Login</h1>
            <FormInput
              inputType="email"
              inputName="email"
              inputPlaceHolder="Email"
              onInputChange={{
                initial: userInfo,
                type: "email",
                setUserInfo,
              }}
              errorMessage={msgEmail}
            />

            <FormInput
              inputType="password"
              inputName="password"
              inputPlaceHolder="Password"
              onInputChange={{
                initial: userInfo,
                type: "password",
                setUserInfo,
              }}
              errorMessage={msgPassword}
            />

            <button
              onClick={_handleSubmit}
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1 mt-4"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
