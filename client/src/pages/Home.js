import './Home.css';
import { useState } from "react";
import WeeklyReport from '../components/WeeklyReport/WeeklyReport';
import InputForm from '../components/InputForm/InputForm';
import Output from '../components/Output/Output';
import axios from '../Axios';

const Home = () => {
    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState();

    const submitHandler = async (event) => {
        try{
            event.preventDefault();
            let Review = {
                data: review,
            };
            const res = await axios.post("/predict", Review, {
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                },
            });

            setSentiment(res.data.sentiment);
            console.log(`the response recieved: ${JSON.stringify(res.data)}`);
            setReview('');
        }catch(err){
            console.log(err);
        }
    }

    const reviewChangeHandler = (event) => {
        setReview(event.target.value);
    };


    return <div className='main--container'>
        <div className='main'>
            <h3>So, how was your day?</h3>
            <InputForm 
                review={review}
                submitHandler={submitHandler}
                reviewChangeHandler={reviewChangeHandler}
            />
            <Output sentiment={sentiment} />
            <br />
            <br />
            <br />
            <br />
        </div>
        <WeeklyReport />
        
    </div>
}

export default Home;