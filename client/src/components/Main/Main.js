import './Main.css';
import { useState } from "react";
import InputForm from '../InputForm/InputForm';
import Output from '../Output/Output';
import axios from '../../Axios';

const Main = () => {
    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState();

    const submitHandler = async (event) => {
        try{
            event.preventDefault();
            const res = await axios.get("/prediction",{
                data: review,
            });

            setSentiment(res.data.sentiment);
            // setSentiment('Positive');
            setReview('');
        }catch(err){
            console.log(err);
        }
    }

    const reviewChangeHandler = (event) => {
        setReview(event.target.value);
    };


    return <div className='main'>
        <InputForm 
            review={review}
            submitHandler={submitHandler}
            reviewChangeHandler={reviewChangeHandler}
        />
        <Output sentiment={sentiment} />
    </div>
}

export default Main;