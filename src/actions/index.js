export const storeParticipationId = (participationId) => {
    return {
        type: 'STORE_PARTICIPATIONID',
        data: {
            participationId: participationId
        }
    };
};

export const storeExternalUserId = (externalUserId) => {
    return {
        type: 'STORE_EXT_USERID',
        data: {
            externalUserId: externalUserId
        }
    }
}

export const storeImageTime = (imgTime) => {
    return {
        type: 'STORE_IMG_TIME',
        data: {
            imageTime: imgTime
        }
    }
}

export const storeExperimentQuestions = (questions) => {
    return {
        type: 'STORE_EXPERIMENTQUESTIONS',
        data: {
            experimentQuestions: questions
        }
    }
}

export const storeExpName = (expName) => {
    return {
        type: 'STORE_EXP_NAME',
        data: {
            experimentName: expName
        }
    }
}

export const storeExperimentInformation = (expInfo) => {
    return {
        type: 'STORE_EXP_INFO',
        data: {
            experimentInfo: expInfo
        }
    }
}

export const releaseParticipationInfo = () => {
    return {
        type: 'RELEASE_PARTICIPATION_INFO'
    };
};