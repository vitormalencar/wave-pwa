import {UPDATE_IS_PLAYING, RESOLVE_PLAYLIST, SELECT_CURRENT_TRACK} from '../constants/playlist.constants';

const InitialState = {
  artwork_url: '',
  title: '',
  tracks: [],
  track_count: 0,
  user: {
    username: ''
  },
  isPlaying: false,
  currentTrack: {
    id: null,
    title: '',
    stream_url: '',
    artwork_url: 'https://via.placeholder.com/200x200',
    user: {
      username: ''
    }
  }
};

export const PlaylistReducer = (state = InitialState, action) => {

  switch (action.type) {
    case RESOLVE_PLAYLIST:
      return {
        ...action.payload,
        trackLength: action.payload.tracks.length,
        currentTrack: state.currentTrack,
        isPlaying: false
      };

    case SELECT_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true
      };

    case UPDATE_IS_PLAYING:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };

    default:
      return state;
  }
};
