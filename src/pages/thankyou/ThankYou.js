import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import "./ThankYou.css";

function ThankYou() {
    const participationState = useSelector(state => state.participationState);
    const experimentState = useSelector(state => state.experimentState);
    
    // send endtime to API
    useEffect(() => {

        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
            body: JSON.stringify({ user: participationState.userId, end: new Date().toISOString()})
        };

        // update experiment to set end date
        fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations/' + participationState.participationId, requestOptions)
        .then(response => {
            return response.json();
        })
        .catch(function(err) {
        });
    }, [participationState.userId, participationState.participationId]);

    /*
    *   Show thank you text and redirection to Uni-Park with the ID.
    */
    return (
        <div>
            <h1>All rounds solved</h1>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Title>Concluding questions</Card.Title>
                                <Card.Body>
                                    <p>To finish the experiment, <b>you have to answer some concluding questions.</b></p>
                                    <p>To do so, <b>click the button below.</b></p>
                                    <Button variant="primary" href={process.env.REACT_APP_UNIPARK_RET_LINK + experimentState.experimentName + "/" + process.env.REACT_APP_UNIPARK_RET_LINK2 + "?return_tic=" + participationState.externalUserId}>Go to concluding questions</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ThankYou;