import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function FullStatementQuestion(props) {
    const initialSelection = '';
    const [selectedValue, setSelectedValue] = useState(initialSelection);
    const [answer, setAnswer] = useState("");
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    useEffect(() => {
        setSelectedValue(initialSelection);
    }, [props.text, props.image])

    const handleClick = (value) => {
        props.answerReceiver({
            questionName: props.question.internalName,
            answerValue: value,
            answerType: props.question.answerType.answerDataType
        });
        setSelectedValue(value);
    }

    const isChecked = (checkboxId) => {
        return checkboxId === selectedValue;
    };

    console.log("FullStatementQuesiton Text und Image");
    console.log(props.text);
    console.log(props.image);

    // show form to input a full statement answer
    return (
        <div>
            <br /><p>{props.question.questionText}</p>
            {['1','2','3','4','5','6','7'].map((id) => (
                id === '1' ? 
                <Form.Check
                    inline
                    label={`${id} ${props.question.answerType.min}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onChange={() => {handleClick(id)}}
                    checked={isChecked(id)}
                /> :
                id === '7' ?
                <Form.Check
                    inline
                    label={`${id} ${props.question.answerType.max}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onChange={() => {handleClick(id)}}
                    checked={isChecked(id)}
                /> : 
                <Form.Check
                    inline
                    label={`${id}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onChange={() => {handleClick(id)}}
                    checked={isChecked(id)}
                />
            ))}
        </div>
    )
}

export default FullStatementQuestion;