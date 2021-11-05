import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  const isValidateEmail = validateEmail(email.trim());
  const isValidatePassword = validatePassword(password);

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
      setMsgEmail({
        err: "Please enter email",
      });
      return 1;
    } else if (!isValidateEmail) {
      setMsgEmail({
        err: "Invalid email",
      });
      return 1;
    } else {
      setMsgEmail({
        err: "email oke",
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
    } else {
      setMsgPassword({
        err: "password oke",
      });
      return 1;
    }
  }
  function checkLogin(inpEmail, inpPassword) {
    return repo.find(
      ({ email, password }) => email === inpEmail && password === inpPassword
    );
  }

  const _handleSubmit = () => {
    checkInputEmail(email);
    checkInputPassword(password);
    console.log(checkLogin(email, password));
    if (checkLogin(email, password)) {
      alert("login successfuly");
    } else {
      alert("login failed");
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Login</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {msgEmail.err ? (
              <p className="text-red-400 font-bold mb-4 pl-2">{msgEmail.err}</p>
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
