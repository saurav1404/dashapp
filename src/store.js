/*
 * src/store.js
 * With initialState
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
export default function configureStore(initialState={}) {
 return createStore(
   applyMiddleware(thunk)
 );
}