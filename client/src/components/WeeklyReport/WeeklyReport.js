import './WeeklyReport.css';
import Button from '../UI/Button/Button';
import { useState } from 'react';
import axios from '../../Axios';

const WeeklyReport = () => {
    const [ report, setReport ] = useState([]);
    const [ lessThanFive, setLessThanFive ] = useState(false);
    const [ click, setClick ] = useState(false);
    const weeklyReportFetch = async (event) => {
        try {
            event.preventDefault();
            // console.log('sending request...')
            const res = await axios.get("/info",{
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                },
            });
            setReport(res.data.data);
            if(res.data.data.length > 0)    setClick(true);
            if(res.data.data.length <= 5)   setLessThanFive(true);
        } catch(err) {
            console.log(err);
        }
    }

    return <div className='weekly-report--container'>
        <Button onClick={weeklyReportFetch}>Get Weekly Report</Button><br />

        { lessThanFive &&  click && <h4>Your week seems to be going smoothly! Here are some suggessions from your entries, resolving which you might be able to make this week even better:</h4>}
        { !lessThanFive && click && <h4>Your week doesn't seem to be going very smooth :( Here are some suggessions from your entries, resolving which might help you make this week better:</h4>}
        {report.map(word => {return word+', '})}
    </div>
};

export default WeeklyReport;