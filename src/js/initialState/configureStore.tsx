import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import {createEpicMiddleware} from 'redux-observable';
import rootEpic from '../epics/rootEpic';
import storage from 'redux-persist/lib/storage';
import {Store} from 'react-redux';
import {AppInterface} from './initialStateInterface';

const { persistStore, persistReducer } = require('redux-persist');


const epicMiddleware = createEpicMiddleware(rootEpic);

const config = {
    storage,
    key: 'root'
};

const reducer = persistReducer(config, rootReducer);


export default () => {
    const store:Store<AppInterface> = createStore(reducer, applyMiddleware(...[epicMiddleware]));
    const persistor = persistStore(store);
    return { store, persistor };
};