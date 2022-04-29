import './Output.css';
import { BiHappyBeaming, BiSad } from 'react-icons/bi';

const Output = (props) => {

    return <div className='output-container'>
        {props.sentiment === "Positive" && <h3>The Review was Positive <BiHappyBeaming /></h3>}
        {props.sentiment === "Negetive" && <h3>The Review was Negetive <BiSad /></h3>}
    </div>
}

export default Output;