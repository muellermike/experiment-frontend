import { useState, React, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeExternalUserId, storeParticipationId, storeImageTime, storeExpName, storeExperimentQuestions, storeExperimentInformation } from '../../actions';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function ExperimentIdentifier() {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    
    const [extUserId, setExtUserId] = useState("");
    const [imgTime, setImgTime] = useState(undefined);
    const [expName, setExpName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadExpInfo, setloadExpInfo] = useState(false);
    const [expInfo, setExpInfo] = useState(undefined);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let query = useQuery();

    useEffect(() => {
        const handleSumbit = () => {
            dispatch(storeExternalUserId(extUserId));
            dispatch(storeImageTime(imgTime));
            dispatch(storeExpName(expName));
            console.log("STORE EXP INFO");
            console.log(expInfo);
            dispatch(storeExperimentInformation(expInfo));
            let participationId = 0;
            
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
                    participationId = data;
    
                    const requestOptions = {
                        mode: 'cors',
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
                    };
            
                    // load experiment questions from the API
                    fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations/' + data, requestOptions)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        dispatch(storeExperimentQuestions(data.questions));
                        navigate("/" + participationId + "/exercise")
                    })
                    .catch(function(err) {
                        console.log(err);
                        navigate("/error");
                    });
                })
                .catch(function(err) {
                    navigate("/error");
                });
        }

        const loadExperimentInformation = () => {
            
            // GET experiment participation
            const getRequestOptions = {
                mode: 'cors',
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
            }
    
            fetch(process.env.REACT_APP_API_BASE_URL + '/experiments/' + expName, getRequestOptions)
                .then(response => {
                    if(response.status !== 200) {
                        throw new Error("Server Error");
                    }
    
                    return response.json();
                })
                .then(data =>  {
                    setloadExpInfo(false);
                    setExpInfo(data);
                })
                .catch(function(err) {
                    navigate("/error");
                });
        }

        if (query.get("id_user")) {
            setExtUserId(query.get("id_user"));
        }
        if (query.get("img_tm")) {
            setImgTime(query.get("img_tm") * 1000);
        }
        if (query.get("exp_name")) {
            setExpName(query.get("exp_name"));
        }

        if(!expInfo && expName !== "") {
            setloadExpInfo(true);
        }

        if (isLoading) {
            handleSumbit();
        }

        if(loadExpInfo) {
            loadExperimentInformation();
        }
    }, [query, isLoading, dispatch, expName, extUserId, imgTime, navigate, expInfo, loadExpInfo])

    /*
    *   Form for the identification of a participant
    */
    return (
        <div>
            <Card>
                <Card.Body>
                    {
                        expInfo ? 
                            <p>{expInfo.introduction}</p> :
                            loadExpInfo ? 
                                <LoadingSpinner /> :
                                <p>Please open the platform with a specific experiment.</p>
                    }
                    <Button variant="primary" style={{ margin: "25px"}} disabled={isLoading} onClick={() => {setIsLoading(true)}} type="submit">
                        {isLoading ? <LoadingSpinner /> : "Start"}
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ExperimentIdentifier;