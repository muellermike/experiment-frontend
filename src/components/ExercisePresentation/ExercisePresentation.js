import React from "react";
import "./ExercisePresentation.css";
import { Card } from "react-bootstrap";
import DOMPurify from "dompurify";

class ExercisePresentation extends React.Component {
    constructor(props){
        super(props);

        // set basic state values
        this.state = {
            timeIsUp: false
        };
    }

    /*
    *   Run steps after component is mounted:
    *   set timeout for showing image several seconds
    */
     componentDidUpdate(prevProps, prevState) {
         if(prevProps !== this.props) {
            this.setState({
                timeIsUp: false
            });

            if(this.timer) {
                clearTimeout(this.timer);
            }
            
            this.timer = setTimeout(() => {
                this.setState({
                    timeIsUp: true
                   });
               }, this.props.imageDuration);

            if(this.timer && !this.props.imageDuration) {
                clearTimeout(this.timer);
            }
         }
    }

    componentDidMount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.setState({
                timeIsUp: true
               });
           }, this.props.imageDuration);

        if(this.timer && !this.props.imageDuration) {
            clearTimeout(this.timer);
        }
    }

    /*
    *  Run steps before the component will unmount.
    *  timeout is cleared.
    */
    componentWillUnmount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    render(){
        // show picture and question
        return (
            <div>
                <Card>
                    <p>{this.props.imageTopText}</p>
                    <Card.Img variant="top" className="Image-Dots" style={{ alignSelf: "center", maxWidth: `${this.props.imageSize}px`, maxHeight: `${this.props.imageSize}px` }} src={this.props.image} /><br />
                    <Card.Body className="card-body-image">
                        <Card.Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.props.text)}}>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ExercisePresentation;