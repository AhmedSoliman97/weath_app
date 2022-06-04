import { CITYCHOOSEN,INITSTATE } from '../actions';


const initialState={
    placeDetails:{city:'none'}
};


const placeDataReducer = (state=initialState, action) => {

    switch (action.type) {
        case CITYCHOOSEN:
            return{
                ...state,
                placeDetails:{...state.placeDetails,city:action.city}
        }
        case INITSTATE:
            return action.details
        
        default:
            return state;
            
    }

};

export default placeDataReducer;
