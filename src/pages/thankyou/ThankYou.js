import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import "./ThankYou.css";
import DOMPurify from "dompurify";

function ThankYou() {
    const participationState = useSelector(state => state.participationState);
    const experimentState = useSelector(state => state.experimentState);
    
    let finalPage = JSON.parse(experimentState.experimentInfo?.finalPage);

    console.log("FINAL PAGE");
    console.log(experimentState.experimentInfo?.finalPage);
    console.log(finalPage?.sectionTitle);

    // send endtime to API
    useEffect(() => {

        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.REACT_APP_API_KEY_VALUE },
            body: JSON.stringify({ end: new Date().toISOString()})
        };

        // update experiment to set end date
        fetch(process.env.REACT_APP_API_BASE_URL + '/experiment-participations/' + participationState.participationId, requestOptions)
        .then(response => {
            return response.json();
        })
        .catch(function(err) {
        });
    }, [participationState.participationId]);

    /*
    *   Show thank you text and redirection to Uni-Park with the ID.
    */
    return (
        <div>
            <h1>{finalPage ? finalPage.header : "All rounds played"}</h1>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Title>{finalPage?.sectionTitle}</Card.Title>
                                <Card.Body>
                                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(finalPage?.instructions)}}></p>
                                    <Button variant="primary" href={process.env.REACT_APP_UNIPARK_RET_LINK + experimentState.experimentName + "/" + process.env.REACT_APP_UNIPARK_RET_LINK2 + "?return_tic=" + participationState.externalUserId}>
                                        {finalPage ? finalPage.actionText : "Go to concluding questions"}
                                    </Button>
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