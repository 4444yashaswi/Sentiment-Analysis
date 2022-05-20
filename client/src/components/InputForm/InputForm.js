// import { useState } from "react";
import './InputForm.css';
import Button from '../UI/Button/Button';

const InputForm = (props) => {

    //setReview(props.review);
    return <form onSubmit = {props.submitHandler}>
        <textarea
          type="text"
          rows='20' cols='60' 
          placeholder="Today's entry" 
          value = {props.review} 
          onChange={props.reviewChangeHandler}
        />
        <br />
        <Button type="submit">Done</Button>
    </form>
}

export default InputForm;