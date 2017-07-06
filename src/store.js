import {createEpicMiddleware} from 'redux-observable';
import {createStore, applyMiddleware, compose} from 'redux';

import combineEpics from './epics';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware(combineEpics);

const loadBackup = (backupId) => JSON.parse(window.localStorage[backupId] || '{}');

const backup = (backupId, backupData) => window.localStorage[backupId] = JSON.stringify(backupData);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = applyMiddleware(createEpicMiddleware(combineEpics));

const persistedState = loadBackup('WAVE_SESSION');
const store = createStore(rootReducer, persistedState, composeEnhancers(createStoreWithMiddleware));

store.subscribe(() => backup('WAVE_SESSION', store.getState()));

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
export {rootReducer};
