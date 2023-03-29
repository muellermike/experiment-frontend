import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function TableQuestion(props) {
    const initialSelection = '';
    const [selectedValue, setSelectedValue] = useState(initialSelection);
    const [startTime, setStartTime] = useState(new Date());

    useEffect(() => {
        setSelectedValue(initialSelection);
        setStartTime(new Date());
    }, [props.text, props.image])

    const handleChange = (value) => {
        let currentTime = new Date();
        props.answerReceiver({
            questionName: props.question.internalName,
            answerValue: value,
            answerStart: startTime,
            answerEnd: currentTime,
            answerTime: currentTime - startTime
        });
        setSelectedValue(value);
    };

    const isChecked = (checkboxId) => {
        return checkboxId === selectedValue;
    };

    // show form to input a likert table <br />{props.question.questionText}<br />
    return (
        <tr>
            <td>{props.question.questionText}</td>
            {['1','2','3','4','5','6','7'].map((id) => (
                <td key={`likert-table-question${id}`}>
                    <Form.Check
                        inline
                        name={props.question.internalName}
                        type="radio"
                        id={`inline-radio-${id}-${props.groupKey}-${props.questionKey}`}
                        className="table-likert-form-input"
                        onChange={() => {handleChange(id)}}
                        checked={isChecked(id)}
                    />
                </td>    
            ))}
        </tr>
    )
}

export default TableQuestion;