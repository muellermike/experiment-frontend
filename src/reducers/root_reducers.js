import participationReducer from "./participation"
import imageReducer from "./image";
import experimentReducer from "./experiment";
import { combineReducers } from "redux";

const allReducer = combineReducers( {
    participationState: participationReducer,
    imageState: imageReducer,
    experimentState: experimentReducer
});

export default allReducer;