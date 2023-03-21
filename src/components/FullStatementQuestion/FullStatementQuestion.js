import { Form } from "react-bootstrap";
import { useState } from "react";

function FullStatementQuestion(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    console.log("FullStatementQuestions");
    console.log(props.question);
    // show form to input a full statement answer
    return (
        <div>
            <br />{props.question.questionText}<br />
            <Form.Check
                inline
                label={`1 ${props.question.answerType.min}`}
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-1`}
            />
            <Form.Check
                inline
                label="2"
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-2`}
            />
            <Form.Check
                inline
                label="3"
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-3`}
            />
            <Form.Check
                inline
                label="5"
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-5`}
            />
            <Form.Check
                inline
                label="5"
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-5`}
            />
            <Form.Check
                inline
                label="6"
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-6`}
            />
            <Form.Check
                inline
                label={`7 ${props.question.answerType.max}`}
                name={props.question.internalName}
                type="radio"
                id={`inline-radio-7`}
            />
        </div>
    )
}

export default FullStatementQuestion;