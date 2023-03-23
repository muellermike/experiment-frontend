import { Form } from "react-bootstrap";
import { useState } from "react";
import FullStatementQuestion from "../FullStatementQuestion/FullStatementQuestion";
import TableGroupQuestions from "../TableQuestion/TableGroupQuestions";

function QuestionGroup(props) {
    const [groupAnswers, setGroupAnswers] = useState([]);

    const receiveAnswer = (value) => {
        props.groupAnswerReceiver({
            groupName: props.group.groupName,
            answer: value
        });
    };

    // show form to input audio file
    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicAudio">
                <Form.Label><b>{props.group.groupTitle}</b><br />{props.group.groupSubtitle}</Form.Label><br />
                {props.group.questionType === "fullIndividualStatement" ? 
                <div>
                    {props.group.questions.map((q, idx) => (
                    <FullStatementQuestion id={`questions-${idx}`} key={`questions-${idx}`} questionKey={`${props.groupKey}-questions-${idx}`} question={q} answerReceiver={receiveAnswer}></FullStatementQuestion>
                ))}
                </div> :
                props.group.questionType === "table" ? 
                <div>
                    <TableGroupQuestions groupKey={`${props.groupKey}`} questions={props.group.questions} answerType={props.group.answerType} answerReceiver={receiveAnswer}></TableGroupQuestions>
                </div> :
                <div>unknown</div>}
            </Form.Group>
        </div>
    )
}

export default QuestionGroup;