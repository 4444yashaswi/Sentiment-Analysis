import './LogIn.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LogIn/LogInForm";
import Button from "../components/UI/Button/Button"
import axios from "../Axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("/login", {
        email: userName,
        password: password,
      });
      sessionStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      if (err.response.data.err === "Invalid credentials!")
        setInvalidCredentials(true);
      else navigate("/error");
    }
  };

  return (
    <div className='login-form--container'>
    <div className='button--container'><Button onClick={() => navigate("/signup")}>SignUp</Button></div>
      <div className='login--container'>
      <h1>Login</h1>
      <LoginForm
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
      <br />
    </div>
  );
};

export default Login;