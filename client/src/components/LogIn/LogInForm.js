import "./LoginForm.css";
import Button from "../UI/Button/Button";
// import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  // const navigate = useNavigate();

  return (
    <form onSubmit={props.submitHandler}>
      <input
      className="email--input"
        type="email"
        placeholder="Email"
        value={props.userName}
        onChange={props.userNameChangeHandler}
      />
      <br />

      <input
      className="password--input"
        type="password"
        placeholder="Password"
        value={props.password}
        onChange={props.passwordChangeHandler}
      />

      <br />
      {props.invalidCredentials && <h3>Invalid Credentials!</h3>}

      <br />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;