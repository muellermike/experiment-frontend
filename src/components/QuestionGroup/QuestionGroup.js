import { Form } from "react-bootstrap";
import FullStatementQuestion from "../FullStatementQuestion/FullStatementQuestion";
import TableGroupQuestions from "../TableQuestion/TableGroupQuestions";

function QuestionGroup(props) {

    console.log("QuestionGroup");
    console.log(props.group);
    console.log(props.group.questions);
    // show form to input audio file
    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicAudio">
                <Form.Label><b>{props.group.groupTitle}</b><br />{props.group.groupSubtitle}</Form.Label><br />
                {props.group.questionType === "fullIndividualStatement" ? 
                <div>
                    {props.group.questions.map((q, idx) => (
                    <FullStatementQuestion id={`questions-${idx}`} key={`questions-${idx}`} questionKey={`${props.groupKey}-questions-${idx}`} question={q}></FullStatementQuestion>
                ))}
                </div> :
                props.group.questionType === "table" ? 
                <div>
                    <TableGroupQuestions groupKey={`${props.groupKey}`} questions={props.group.questions} answerType={props.group.answerType}></TableGroupQuestions>
                </div> :
                <div>unknown</div>}
            </Form.Group>
        </div>
    )
}

export default QuestionGroup;