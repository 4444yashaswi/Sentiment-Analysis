import './SignUp.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignUp/SignUpForm";
import Button from "../components/UI/Button/Button";
import axios from "../Axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log(
        `sending this: name: ${name} email: ${userName} password: ${password}`
      );
      const res = await axios.post("/Signup", {
        name: name,
        email: userName,
        password: password,
      });
      console.log(`Res = ${res}`);
      navigate("/login");
    } catch (err) {
      if (err.response.data.err === "Email already exists!")
        setInvalidCredentials(true);
      else navigate("/error");
    }
  };

  return (
    <div className="signup-form--container">
    <div className="button--container"><Button onClick={() => navigate("/login")}>LogIn</Button></div>
      <div className="signup--container">
      <h1>SignUp</h1>
      <SignupForm
        name={name}
        nameChangeHandler={nameChangeHandler}
        userName={userName}
        userNameChangeHandler={userNameChangeHandler}
        password={password}
        passwordChangeHandler={passwordChangeHandler}
        submitHandler={submitHandler}
        invalidCredentials={invalidCredentials}
      />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Signup;