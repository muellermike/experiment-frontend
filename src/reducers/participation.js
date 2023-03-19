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
        case "STORE_EXPERIMENTID":
            return {
                ...state,
                experimentId: action.data.experimentId
            };;
        case "RELEASE_USER_INFO":
            return initialState;
        default:
            return state;
    }
}

export default participationReducer;