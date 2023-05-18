import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import RangeQuestion from "../RangeQuestion/RangeQuestion";

function FullStatementQuestion(props) {
    const initialSelection = '';
    const [selectedValue, setSelectedValue] = useState(initialSelection);
    const [startTime, setStartTime] = useState(new Date());

    let renderResult;

    useEffect(() => {
        setSelectedValue(initialSelection);
        setStartTime(new Date());
    }, [props.text, props.image])

    const handleClick = (value) => {
        let currentTime = new Date();

        props.answerReceiver({
            questionName: props.question.internalName,
            answerValue: value,
            answerType: props.question.answerType.answerDataType,
            answerStart: startTime,
            answerEnd: currentTime,
            answerTime: currentTime - startTime
        });
        setSelectedValue(value);
    }

    const isChecked = (checkboxId) => {
        return checkboxId === selectedValue;
    };

    switch(props.question.answerType.type) {
        case "likert":
            renderResult = ['1','2','3','4','5','6','7'].map((id) => (
                id === '1' ? 
                <Form.Check
                    inline
                    key={`likert-ansver-vlaue-${id}`}
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
                    key={`likert-ansver-vlaue-${id}`}
                    label={`${id} ${props.question.answerType.max}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onChange={() => {handleClick(id)}}
                    checked={isChecked(id)}
                /> : 
                <Form.Check
                    inline
                    key={`likert-ansver-vlaue-${id}`}
                    label={`${id}`}
                    name={props.question.internalName}
                    type="radio"
                    id={`inline-radio-${id}-${props.questionKey}`}
                    onChange={() => {handleClick(id)}}
                    checked={isChecked(id)}
                />
            ))
            break;
        case "percentage":
            renderResult = <RangeQuestion max={props.question.answerType.max} min={props.question.answerType.min} handleSlide={handleClick} valueToShow={selectedValue}></RangeQuestion>
            break;
            case "binominal":
                renderResult = renderResult = ['1','2',].map((id) => (
                    id === '1' ? 
                    <Form.Check
                        inline
                        key={`likert-ansver-vlaue-${id}`}
                        label={`${id} ${props.question.answerType.min}`}
                        name={props.question.internalName}
                        type="radio"
                        id={`inline-radio-${id}-${props.questionKey}`}
                        onChange={() => {handleClick(id)}}
                        checked={isChecked(id)}
                    /> :
                    id === '2' ?
                    <Form.Check
                        inline
                        key={`likert-ansver-vlaue-${id}`}
                        label={`${id} ${props.question.answerType.max}`}
                        name={props.question.internalName}
                        type="radio"
                        id={`inline-radio-${id}-${props.questionKey}`}
                        onChange={() => {handleClick(id)}}
                        checked={isChecked(id)}
                    /> : 
                    <Form.Check
                        inline
                        key={`likert-ansver-vlaue-${id}`}
                        label={`${id}`}
                        name={props.question.internalName}
                        type="radio"
                        id={`inline-radio-${id}-${props.questionKey}`}
                        onChange={() => {handleClick(id)}}
                        checked={isChecked(id)}
                    />
                ))
                break;
        default:
            renderResult = <div>statement type unknown</div>
            break;
    }

    // show form to input a full statement answer
    return (
        <div style={{marginTop: 15}}>
            <p>{props.question.questionText}</p>
            {renderResult}
        </div>
    )
}

export default FullStatementQuestion;