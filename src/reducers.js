import {combineReducers} from 'redux';

import {PlaylistReducer} from './core/reduces/playlist.reducer';

export default combineReducers({playlist: PlaylistReducer});
