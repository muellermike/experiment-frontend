import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function TableQuestion(props) {
    const initialSelection = '';
    const [selectedValue, setSelectedValue] = useState(initialSelection);

    console.log("TableQuestion");
    console.log(props.question.internalName);
    console.log(props.question.questionText);
    console.log(props.groupKey);
    console.log(props.questionKey);
    console.log(props.text);
    console.log(props.image);

    useEffect(() => {
        setSelectedValue(initialSelection);
    }, [props.text, props.image])

    const handleChange = (value) => {
        props.answerReceiver({
            questionName: props.question.internalName,
            answerValue: value
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
                <td>
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