import "./TableGroupQuestions.css";
import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import TableQuestion from "./TableQuestion";

function TableGroupQuestions(props) {
    const initialSelection = '';
    const [selectedValue, setSelectedValue] = useState(initialSelection);
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState("");
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    const receiver = (value) => {
        value.answerType = props.answerType.answerDataType;
        props.answerReceiver(value);
    };

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
                        <TableQuestion question={q} questionKey={questionKey} groupKey={props.groupKey} answerReceiver={receiver} image={props.image} text={props.text}></TableQuestion>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableGroupQuestions;