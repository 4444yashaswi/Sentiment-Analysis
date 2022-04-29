import { useState } from "react";
import Button from '../UI/Button/Button';

const InputForm = (props) => {

    //setReview(props.review);
    return <form onSubmit = {props.submitHandler}>
        <textarea
          type="text"
          rows='5' cols='50' 
          placeholder='Enter your review' 
          value = {props.review} 
          onChange={props.reviewChangeHandler}
        />
        <br />
        <Button type="submit">Submit</Button>
    </form>
}

export default InputForm;