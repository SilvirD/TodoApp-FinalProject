import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");
  const [msgRePassword, setMsgRePassword] = useState("");

  const [repo, setRepo] = useState([]);

  // fetch data localhost
  useEffect(() => {
    axios
      .get("http://localhost:5005/user")
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
    checkInputName(name);
    checkInputEmail(email);
    checkInputPassword(password);
    checkInputRepassword(re_password);
    const dataRegister = {
      username: name,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5005/user/addUser", dataRegister)
      .then((response) => {
        console.log(response);
        alert("add user successfully");
        setName("");
        setEmail("");
        setPassword("");
        setRePassword("");
      })
      .catch((error) => {
        alert("error send data", error);
      });
  };

  // functions check
  function checkInputName(name) {
    if (!name) {
      setMsgName({
        err: "Please enter name",
      });
      return 1;
    } else if (!isValidateName) {
      setMsgName({
        err: "Invalid name",
      });
      return 1;
    }
  }
  function checkExitsEmail(inpEmail) {
    return repo.find(({ email }) => email === inpEmail);
  }
  function checkInputEmail(email) {
    if (!email) {
      setMsgEmail({
        err: "Please enter email",
      });
      return 1;
    } else if (!isValidateEmail) {
      setMsgEmail({
        err: "Invalid email",
      });
      return 1;
    } else if (checkExitsEmail(email)) {
      setMsgEmail({
        err: "Email already exits",
      });
      return 1;
    }
  }
  function checkInputPassword(password) {
    if (!password) {
      setMsgPassword({
        err: "Please enter password",
      });
      return 1;
    } else if (!isValidatePassword) {
      setMsgPassword({
        err: "Invalid password. Should contain at least one digit, one lower case, one upper case, 8 characters.",
      });
      return 1;
    }
  }
  function checkInputRepassword(rePassword) {
    if (!rePassword) {
      setMsgRePassword({
        err: "Please enter confirm password",
      });
      return 1;
    } else if (!(rePassword === password)) {
      setMsgRePassword({
        err: "Incorrect confirm password",
      });
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
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center font-bold">Sign up</h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mt-4"
                name="username"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {msgName.err ? (
                <p className="text-red-400 font-bold mb-4 pl-2">
                  {msgName.err}
                </p>
              ) : null}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mt-4"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {msgEmail.err ? (
                <p className="text-red-400 font-bold mb-4 pl-2">
                  {msgEmail.err}
                </p>
              ) : null}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mt-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {msgPassword.err ? (
                <p className="text-red-400 font-bold mb-4 pl-2">
                  {msgPassword.err}
                </p>
              ) : null}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mt-4"
                name="confirm_password"
                placeholder="Confirm Password"
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}
              />
              {msgRePassword.err ? (
                <p className="text-red-400 font-bold mb-4 pl-2">
                  {msgRePassword.err}
                </p>
              ) : null}

              <button
                onClick={_handleSubmit}
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1 mt-4"
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
