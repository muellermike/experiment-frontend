import ParticipantIdentifier from "../../components/ParticipantIdentifier/ParticipantIdentifier";
import "./Introduction.css";

function Introduction() {
    
    /*
    *   Show introduction to the experiment.
    */
    return (
        <div>
            <h3>Welcome to the Experiment</h3>
            <div>
                <ParticipantIdentifier></ParticipantIdentifier>
            </div>
        </div>
    )
}

export default Introduction;