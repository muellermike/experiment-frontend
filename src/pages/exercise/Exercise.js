import "./Exercise.css";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import ExercisePresentation from "../../components/ExercisePresentation/ExercisePresentation";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import ImportantInformation from "../../components/ImportantInformation/ImportantInformation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function Exercise() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { participationId } = useParams();
    const [exercise, setExercise] = useState({});
    const [count, setCount] = useState(1);
    const participationState = useSelector(state => state.participationState);
    const imageState = useSelector(state => state.imageState);
    const experimentState = useSelector(state => state.experimentState);

    // lade die nächste "Aufgabe" über das API

    useEffect(() => {

        const requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
        };
        
        // load exercise data from the API the first time
        fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations/' + participationId + '/exercises/next', requestOptions)
        .then(response => {
            if(response.status !== 200) {
                throw new Error("Server Error");
            } else if(response.status === 204) {
                navigate("/thankyou");
            }

            return response.json();
        })
        .then(data => {
            setExercise(data);
        })
        .catch(function(err) {
            navigate("/error");
        });
    }, [participationId, participationState.participationId, navigate, dispatch]);

    const handleSubmit = (answer) => {
        if(answer) {
            // POST answer
            const requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
                body: JSON.stringify({
                    answer: JSON.stringify(answer),
                    experimentId: participationState.participationId,
                    time: new Date().toISOString(),
                    imageId: parseInt(exercise.image.imageId),
                    textId: parseInt(exercise.text.textId)
                })
            };
            fetch(process.env.REACT_APP_API_BASE_URL + '/exercises', requestOptions)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error("Server Error");
                }

                return response.json();
            })
            .then(data =>  {
                const requestOptions = {
                    mode: 'cors',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE }
                };
                
                // load next exercise data from the api
                fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations/' + participationId + '/exercises/next', requestOptions)
                .then(response => {
                    if (response.status === 204) {
                        navigate("/thankyou");
                    } else if (response.status !== 200) {
                        throw new Error("Server Error");
                    }

                    return response.json();
                })
                .then(data => {
                    setExercise(data);
                    setCount(count + 1);
                });
            })
            .catch(function(err) {
                navigate("/error");
            });
        } else {
            alert("you shall not pass");
        }
    }

    // Daten anzeigen
    return (
        <div>
            <h1>Experiment</h1>
            <Container>
                <Row>
                    <ImportantInformation></ImportantInformation>
                </Row>
                {
                experimentState.experimentInfo && experimentState.experimentInfo.numOfExercises > 1 ?    
                <Row id="progress-bar" className="Container-Row">
                    <Col>
                        <ProgressBar now={((count / experimentState.experimentInfo?.numOfExercises) * 100).toFixed(2)} label={((count / experimentState.experimentInfo?.numOfExercises) * 100).toFixed(2) + " %"}></ProgressBar>
                    </Col>
                </Row>
                : <></>
                }
                <Row className="Container-Row">
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <ExercisePresentation text={exercise.text?.text} image={"data:" + exercise.image?.mimeType + ";base64, " + exercise.image?.encodedString} imageTopText={exercise.image?.topText} imageSize={exercise.image?.maxImageSize} imageDuration={imageState.imageTime} />
                    </Col>
                    <Col className="Container-Col">
                        <div className="Answer-Part">
                            <h2>{exercise.question}</h2>
                            <br />
                            <AnswerForm questions={participationState.experimentQuestions} text={exercise.text?.textId} image={exercise.image?.imageId} onSubmit={handleSubmit} />
                        </div>
                    </Col>
                </Row>
            </Container>        
        </div>
    )
}

export default Exercise;