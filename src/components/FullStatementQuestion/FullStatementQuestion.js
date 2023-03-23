import { Form } from "react-bootstrap";
import { useState } from "react";

function FullStatementQuestion(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    const handleClick = (value) => {
        props.answerReceiver({
            questionName: props.question.internalName,
            answerValue: value,
            answerType: props.question.answerType.answerDataType
        });
    }

    // show form to input a full statement answer
    return (
        <div>
            <br />{props.question.questionText}<br />
            {['1','2','3','4','5','6','7'].map((id) => (
                id === '1' ? 
                <Form.Check
                    inline
                    label={`${id} ${props.question.answerType.min}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onClick={() => {handleClick(id)}}
                /> :
                id === '7' ?
                <Form.Check
                    inline
                    label={`${id} ${props.question.answerType.max}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onClick={() => {handleClick(id)}}
                /> : 
                <Form.Check
                    inline
                    label={`${id}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onClick={() => {handleClick(id)}}
                />
            ))}
        </div>
    )
}

export default FullStatementQuestion;