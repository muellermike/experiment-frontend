import { useState, React, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeExternalUserId, storeParticipationId, storeImageTime, storeExpName, storeExperimentQuestions } from '../../actions';

function ParticipantIdentifier() {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    
    const [extUserId, setExtUserId] = useState("");
    const [imgTime, setImgTime] = useState(undefined);
    const [expName, setExpName] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let query = useQuery();

    useEffect(() => {
        if (query.get("id_user")) {
            setExtUserId(query.get("id_user"));
        }
        if (query.get("img_tm")) {
            setImgTime(query.get("img_tm") * 1000);
        }
        if (query.get("exp_name")) {
            setExpName(query.get("exp_name"));
        }
    }, [query])

    const handleSumbit = () => {
        dispatch(storeExternalUserId(extUserId));
        dispatch(storeImageTime(imgTime));
        dispatch(storeExpName(expName));
        
        // POST experiment participation
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
            body: JSON.stringify({
                originId: extUserId,
                start: new Date().toISOString(),
                experimentName: expName,
                imageTime: imgTime
            })
        }

        fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations', requestOptions)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error("Server Error");
                }

                return response.json();
            })
            .then(data =>  {
                dispatch(storeParticipationId(data));

                const requestOptions = {
                    mode: 'cors',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
                };
        
                // load exercise data from the API the first time
                fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations/' + data, requestOptions)
                .then(data => {
                    dispatch(storeExperimentQuestions(data));
                    navigate("/" + data + "/exercise")
                })
                .catch(function(err) {
                    navigate("/error");
                });
            })
            .catch(function(err) {
                navigate("/error");
            });
    }

    /*
    *   Form for the identification of a participant
    */
    return (
        <div>
            <Card>
                <Card.Title>Participate in the experiment</Card.Title>
                <Card.Body>
                    <p>This is the user interface in which the described experiment takes place. Please take your time to perform the experiment.</p>
                    <p>To participate in the experiment, please choose next.</p>
                    <Button variant="primary" style={{ margin: "25px"}} onClick={handleSumbit} type="submit">Next</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ParticipantIdentifier;