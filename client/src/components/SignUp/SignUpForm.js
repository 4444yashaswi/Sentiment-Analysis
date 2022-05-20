import "./SignUpForm.css";
import Button from "../UI/Button/Button";
// import { useNavigate } from "react-router-dom";

const SignupForm = (props) => {
  // const navigate = useNavigate();

  return (
    <form onSubmit={props.submitHandler}>
      <input
      className="name--input"
        type="text"
        placeholder="Name"
        value={props.name}
        onChange={props.nameChangeHandler}
      />
      <br />

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

      {props.invalidCredentials && <h3>Email already exists!</h3>}

      <br />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignupForm;