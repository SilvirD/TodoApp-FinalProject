import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../common/FormInput";
import { apiClient } from "../../helper/api_client";

const initialValue = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
};

const initialMsg = {
  msgName: "",
  msgEmail: "",
  msgPassword: "",
  msgRePassword: "",
};

const Register = () => {
  const [userInfo, setUserInfo] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState(initialMsg);
  const [repo, setRepo] = useState([]);

  const { name, email, password, rePassword } = userInfo;
  const { msgName, msgEmail, msgPassword, msgRePassword } = errorMsg;

  // fetch data localhost
  useEffect(() => {
    apiClient
      .get("/user")
      .then((response) => {
        let user = response.data;
        setRepo(user);
      })
      .catch((error) => {
        console.log("error fetch data", error);
      });
  }, []);

  const isValidateName = validateName(name.trim());
  const isValidateEmail = validateEmail(email.trim());
  const isValidatePassword = validatePassword(password);

  // Data send to BE
  const _handleSubmit = () => {
    if (
      checkInputName(name) ||
      checkInputEmail(email) ||
      checkInputPassword(password) ||
      checkInputRepassword(rePassword, password)
    ) {
    } else {
      const dataRegister = {
        username: name,
        email: email,
        password: password,
      };
      apiClient
        .post("/user/addUser", dataRegister)
        .then((response) => {
          console.log(response);
          alert("add user successfully");
          setErrorMsg(initialMsg);
          setUserInfo(initialValue);
        })
        .catch((error) => {
          alert("error send data", error);
        });
    }
  };

  // functions check
  function checkInputName(name) {
    if (!name) {
      setErrorMsg({ ...errorMsg, msgName: "Please enter name" });

      return 1;
    } else if (!isValidateName) {
      setErrorMsg({ ...errorMsg, msgName: "Invalid name" });

      return 1;
    }
  }
  function checkExitsEmail(inpEmail) {
    return repo.find(({ email }) => email === inpEmail);
  }
  function checkInputEmail(email) {
    if (!email) {
      setErrorMsg({ ...errorMsg, msgEmail: "Please enter email" });
      return 1;
    } else if (!isValidateEmail) {
      setErrorMsg({ ...errorMsg, msgEmail: "Invalid email" });
      return 1;
    } else if (checkExitsEmail(email)) {
      setErrorMsg({ ...errorMsg, msgEmail: "Email already exits" });
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
  function checkInputRepassword(rePassword, password) {
    if (!rePassword) {
      setErrorMsg({
        ...errorMsg,
        msgRePassword: "Please enter confirm password",
      });

      return 1;
    } else if (!(rePassword === password)) {
      setErrorMsg({ ...errorMsg, msgRePassword: "Incorrect confirm password" });

      return 1;
    }
  }

  // functions validate
  function validateName(name) {
    var validCharactersRegex = /^[a-zA-Z ]{2,30}$/;
    return validCharactersRegex.test(name.trim());
  }
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

  return (
    <>
      <div>
        <div className="bg-gray-200 min-h-screen flex flex-col">
          <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded-sm shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center font-bold">Sign up</h1>

              <FormInput
                inputType="text"
                inputName="username"
                inputPlaceHolder="Full Name"
                onInputChange={{ initial: userInfo, type: "name", setUserInfo }}
                errorMessage={msgName}
              />

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

              <FormInput
                inputType="password"
                inputName="confirm_password"
                inputPlaceHolder="Confirm Password"
                onInputChange={{
                  initial: userInfo,
                  type: "rePassword",
                  setUserInfo,
                }}
                errorMessage={msgRePassword}
              />

              <button
                onClick={_handleSubmit}
                className="w-full text-center py-3 rounded-sm bg-blue-400 text-white hover:bg-blue-300 focus:outline-none my-1 mt-4"
              >
                Create Account
              </button>
            </div>

            <div className="text-gray-500 mt-6">
              Already have an account?
              <span className="text-blue-600">
                <Link to="/login" className="login-link">
                  &ensp;Log in.
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
