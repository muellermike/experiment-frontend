const initialState = {
    participationId: 0,
    externalUserId: "",
    experimentId: 0
};

const participationReducer = (state = initialState, action) => {
    switch(action.type) {
        case "STORE_PARTICIPATIONID":
            return {
                ...state,
                participationId: action.data.participationId
            };
        case "STORE_EXT_USERID":
            return {
                ...state,
                externalUserId: action.data.externalUserId
            };;
        case "STORE_EXPERIMENTQUESTIONS":
            return {
                ...state,
                experimentQuestions: JSON.parse(action.data.experimentQuestions),
                bareExperimentQuestions: action.data.experimentQuestions
            };;
        case "RELEASE_PARTICIPATION_INFO":
            return initialState;
        default:
            return state;
    }
}

export default participationReducer;