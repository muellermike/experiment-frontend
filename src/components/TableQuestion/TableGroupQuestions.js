import "./TableGroupQuestions.css";
import { useState } from "react";
import { Form, Table } from "react-bootstrap";

function TableGroupQuestions(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    console.log("TableGroupQuestions");
    console.log(props.questions);
    console.log(props.answerType);
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
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-1-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-2-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-3-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-4-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-5-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-6-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                            <td>
                                <Form.Check
                                    inline
                                    name={q.internalName}
                                    type="radio"
                                    id={`inline-radio-7-${props.groupKey}-${questionKey}`}
                                    className="table-likert-form-input"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableGroupQuestions;