import "./Practise.css";
import { Button, Col, Container, Fade, Row } from "react-bootstrap";
import ExercisePresentation from "../../components/ExercisePresentation/ExercisePresentation";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import ExperimentDescription from "../../components/ExperimentDescription/ExperimentDescription";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ex1 from "../../assets/images/ex17.PNG";
import ex2 from "../../assets/images/ex19.PNG";
import empty from "../../assets/images/empty_ex.PNG";
import ImportantInformation from "../../components/ImportantInformation/ImportantInformation";

function Practise() {
    let navigate = useNavigate();

    const exercises = [{
        question: "On which side are more dots?",
        image: ex1
    },{
        question: "On which side are more dots?",
        image: ex2
    }];

    const [exercise, setExercise] = useState(exercises[0]);
    const [count, setCount] = useState(0);
    const [showArrow, setShowArrow] = useState(false);
    const globalState = useSelector(state => state.participationState);
    const imageState = useSelector(state => state.imageState);

    const handleSubmit = (answer) => {
        if(answer) {
            // forget answer and show next practise-exercise
            if(count === (exercises.length - 1)) {
                setShowArrow(true);
                setExercise({
                    question: "On which side are more dots?",
                    image: empty
                });
            } else {
                setExercise(exercises[count + 1]);
                setCount(count + 1);
                setShowArrow(false);
            }
        } else {
            alert("you shall not pass");
        }
    }

    const startExperiment = () => {
        // navigate to the experiment
        navigate("/" + globalState.experimentId + "/exercise")
    }

    // Daten anzeigen
    return (
        <div>
            <h1>Practice Task of the Dots Estimation Experiment</h1>
            <Container>
                <Row className="Container-Row">
                    <ImportantInformation></ImportantInformation>
                    <ExperimentDescription></ExperimentDescription>
                </Row>
                <Row className="Container-Row">
                    <Col xs={12} sm={12} md={7}>
                        <ExercisePresentation text={exercise.text?.text} image={exercise.image} imageDuration={imageState.imageTime} />
                    </Col>
                    <Col className="Container-Col">
                        <div className="Answer-Part">
                            <h2>{exercise.question}</h2>
                            <p>You're in the practise mode. Your answers are not stored.</p>
                            { !showArrow ? 
                            <AnswerForm onSubmit={handleSubmit} />
                            :
                            <Fade in={showArrow} timeout={500} >
                                <div className="experiment-hint">
                                    <Button variant="primary" onClick={startExperiment}>Start the experiment</Button>
                                </div>
                            </Fade>}
                        </div>
                    </Col>
                </Row>
            </Container>        
        </div>
    )
}

export default Practise;