import reducer from './reducer.js';
import { createStore } from 'redux';

const getInitialState = () => {
    return {
    listing: []
    }
}
 export const store = createStore(reducer, getInitialState());
