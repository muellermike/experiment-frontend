import ExperimentIdentifier from "../../components/ExperimentIdentifier/ExperimentIdentifier";
import "./Introduction.css";

function Introduction() {
    
    /*
    *   Show introduction to the experiment.
    */
    return (
        <div>
            <h3>Welcome to the Experiment</h3>
            <div>
                <ExperimentIdentifier></ExperimentIdentifier>
            </div>
        </div>
    )
}

export default Introduction;