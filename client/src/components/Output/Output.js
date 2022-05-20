import './Output.css';
import { BiHappyBeaming, BiSad } from 'react-icons/bi';

const Output = (props) => {

    return <div className='output-container'>
        {props.sentiment === "Positive" && <h3>Looks like your day went well! <BiHappyBeaming /></h3>}
        {props.sentiment === "Negative" && <h3>Looks like you had a tough day. <BiSad /></h3>}
    </div>
}

export default Output;