import  {FELLOW_FEEDBACK}  from '../constants/fellowFeedback';
import initialState from './initialState';

const fellowFeedbackReducer = (state = initialState.fellowFeedbackNotify, action) => {
    switch (action.type) {
        case FELLOW_FEEDBACK: {
            return {
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export default fellowFeedbackReducer;
