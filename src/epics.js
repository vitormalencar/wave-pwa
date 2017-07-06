import { combineEpics } from 'redux-observable';
import requestPlaylistEpic from './core/epics/playlist.epic';

export default combineEpics(
  requestPlaylistEpic
);
