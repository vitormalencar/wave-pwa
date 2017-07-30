import {h} from 'preact';

const PlaylistItem = ({track, selectCurrentTrack}) => (
  <li onClick={() => selectCurrentTrack(track)}>
    <div className="song truncate">
      <a>{track.title}</a>
    </div>
    <div className="artist">{track.user.username}</div>
  </li>
);

export default PlaylistItem;
