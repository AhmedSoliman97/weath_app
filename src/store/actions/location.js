import * as actionTypes from '../actions'

export const setPlace=(initlPlace)=>{
    return {
        type:actionTypes.INITSTATE,
        details:initlPlace
    }
};

export const setCity=(cityName)=>{
    return {
        type:actionTypes.CITYCHOOSEN,
        city:cityName
    }
}