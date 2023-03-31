import { Col, Form, Row } from "react-bootstrap";

function RangeQuestion(props) {

    // show form to input a full statement answer
    return (
        <div>
            <Row>
                <Col xs={9}>
                    <Form.Range value={props.valueToShow !== '' ? props.valueToShow : 0} max={props.max} min={props.min} defaultValue={props.min} onChange={(e) => {props.handleSlide(e.target.value);}} style={{ marginTop: 7}}></Form.Range>
                </Col>
                <Col>
                    <Form.Control placeholder={`${props.valueToShow !== '' ? props.valueToShow : props.min} %`} disabled />
                </Col>
            </Row>
        </div>
    )
}

export default RangeQuestion;