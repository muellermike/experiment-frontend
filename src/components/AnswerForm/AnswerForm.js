import "./AnswerForm.css";
import { Alert, Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { useState } from "react";

function AnswerForm(props) {
    const initialAnswer = "";
    const [isAnswered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState(initialAnswer);
    const [clickTime, setClickTime] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

    const answers = [
        { value: "left", name: "There are more dots on the left side.", payout: "(payout 0.5 Cents)" },
        { value: "right", name: "There are more dots on the right side.", payout: "(payout 5 Cents)" }
    ];
    
    console.log(props.questions);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(answer, (clickTime - startTime), (new Date() - startTime));
        setAnswered(false);
        setAnswer(initialAnswer);
        setStartTime(new Date());
    }

    // show form to input audio file
    return (
        <div>
            {props.questions[0].groupName}
            <Form className="vertical-center">
                <Form.Group className="mb-3" controlId="formBasicAudio">
                    <Form.Label>Please answer the question by <b>clicking on one of the buttons</b> below.</Form.Label><br />
                    <ButtonGroup>
                        {answers.map((a, idx) => (
                        <ToggleButton
                            required
                            disabled={isAnswered}
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={'outline-success'}
                            name="radio"
                            value={a.value}
                            checked={answer === a.value}
                            onChange={(e) => {
                                setClickTime(new Date());
                                setAnswer(e.currentTarget.value);
                                setAnswered(true);
                            }}
                        >
                            <b>{a.name}</b> <br /> {a.payout}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                    { isAnswered ? 
                    <Alert key={"success"} variant={"success"}>
                        <HiOutlineBadgeCheck size={"2em"} /> Successfully answered!
                    </Alert> : "" }
                </Form.Group>
                <Button variant="primary" disabled={!isAnswered} type="submit" onClick={handleSubmit}>
                    Play next round
                </Button>
            </Form>
            
        </div>
    )
}

export default AnswerForm;