import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

function RangeQuestion(props) {
    const initialSelection = props.min;
    const [selectedValue, setSelectedValue] = useState(initialSelection);

    // show form to input a full statement answer
    return (
        <div>
            <Row>
                <Col xs={9}>
                    <Form.Range max={props.max} min={props.min} defaultValue={props.min} onChange={(e) => {props.handleSlide(e.target.value);}} style={{ marginTop: 7}}></Form.Range>
                </Col>
                <Col>
                    <Form.Control placeholder={`${props.valueToShow !== '' ? props.valueToShow : props.min} %`} disabled />
                </Col>
            </Row>
        </div>
    )
}

export default RangeQuestion;