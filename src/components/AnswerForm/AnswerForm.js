import "./AnswerForm.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import QuestionGroup from "../QuestionGroup/QuestionGroup";

function AnswerForm(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());
    
    console.log("AnswerForm")
    console.log(props.questions);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(answer, (clickTime - startTime), (new Date() - startTime));
        setAnswered(false);
        setAnswer(initialAnswer);
        setStartTime(new Date());
    }

    // show form to input audio file
    return (
        <div>
            <Form className="vertical-center">
                {props.questions.map((qg, ind) => (
                    <QuestionGroup id={`group-${ind}`} key={`group-${ind}`} group={qg}></QuestionGroup>
                ))}
                <Button variant="primary" disabled={!isAnswered} type="submit" onClick={handleSubmit}>
                    Next
                </Button>
            </Form>
            
        </div>
    )
}

export default AnswerForm;