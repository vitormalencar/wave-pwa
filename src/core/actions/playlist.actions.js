import {
  LOAD_PLAYLIST,
  RESOLVE_PLAYLIST,
  UPDATE_IS_PLAYING,
  SELECT_CURRENT_TRACK,
  REQUEST_PLAYLIST_ERROR
} from '../constants/playlist.constants';

export const loadPlaylist = () => ({type: LOAD_PLAYLIST});

export const requestPlaylistError = () => ({type: REQUEST_PLAYLIST_ERROR});

export const resolvePlaylist = response => ({type: RESOLVE_PLAYLIST, payload: response});

export const selectCurrentTrack = (track) => ({type: SELECT_CURRENT_TRACK, payload: track});

export const updateIsPlaying = () => ({type: UPDATE_IS_PLAYING});
