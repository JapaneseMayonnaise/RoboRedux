import { CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
 } from './constants.js';
 
 // it just receives text and returns an object with 2 elements, 
 // type(What happened) and payload(an input text)
 export const setSearchField = (text) => ({
    // Description of user action
    type: CHANGE_SEARCH_FIELD,
    // User input
    payload: text
 });
 
 export const requestRobots = () => (dispatch) => {
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
    .catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}))
 }