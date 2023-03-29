import "./AnswerForm.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import QuestionGroup from "../QuestionGroup/QuestionGroup";

function AnswerForm(props) {
    const initialAnswer = [];
    const [isAnswered, setAnswered] = useState(false);
    const [answers, setAnswers] = useState(initialAnswer);

    const questionsLength = () => {
        let count = 0;
        for(let i=0; i < props.questions.length; i ++) {
            count += props.questions[i].questions.length;
        }
        return count;
    };

    if(answers.length === questionsLength() && !isAnswered) {
        setAnswered(true);
    }

    const receiveAnswer = (value) => {
        if(answers.findIndex(item => item.answer.questionName === value.answer.questionName) !== -1) {
            setAnswers(prevArray => 
                prevArray.map(item => (item.answer.questionName === value.answer.questionName ? { ...item, answer: value.answer } : item))
            );
        } else {
            setAnswers(prevArray => [...prevArray, value]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(answers);
        setAnswered(false);
        setAnswers(initialAnswer);
    }

    // show form to input audio file
    return (
        <div>
            <Form className="vertical-center">
                {props.questions.map((qg, ind) => (
                    <QuestionGroup id={`group-${ind}`} key={`group-${ind}`} groupKey={`group-${ind}`} group={qg} groupAnswerReceiver={receiveAnswer} image={props.image} text={props.text}></QuestionGroup>
                ))}
                <Button variant="primary" disabled={!isAnswered} type="submit" onClick={handleSubmit}>
                    Next
                </Button>
            </Form>
            
        </div>
    )
}

export default AnswerForm;