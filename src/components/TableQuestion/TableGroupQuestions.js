import "./TableGroupQuestions.css";
import { useState } from "react";
import { Form, Table } from "react-bootstrap";

function TableGroupQuestions(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    const handleClick = (value, name) => {
        props.answerReceiver({
            questionName: name,
            answerValue: value,
            answerType: props.answerType.answerDataType
        });
    }

    // show form to input a likert table <br />{props.question.questionText}<br />
    return (
        <div>
            
            <Table striped hover size="sm" className="likert-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>{props.answerType.min}</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>{props.answerType.max}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.questions.map((q, questionKey) => (
                        <tr>
                            <td>{q.questionText}</td>
                            {['1','2','3','4','5','6','7'].map((id) => (
                                <td>
                                    <Form.Check
                                        inline
                                        name={q.internalName}
                                        type="radio"
                                        id={`inline-radio-${id}-${props.groupKey}-${questionKey}`}
                                        className="table-likert-form-input"
                                        onClick={() => {handleClick(id, q.internalName)}}
                                    />
                                </td>    
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableGroupQuestions;