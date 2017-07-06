import {h} from 'preact';

const PlaylistHeader = ({artwork_url, title, user, track_count, xlArtwork}) => (
  <div>
    <div class="top-title ">
      <h1 class='truncate'>
        {title}
      </h1>
    </div>
    <header class="playlist">
      <img src={xlArtwork(artwork_url)} alt='cover'/>
      <h1>
        {title}
      </h1>
      <small>{track_count}
        songs</small>
      <small>By {user.username}</small>
    </header>
    <div class="ghost"></div>
  </div>
);

export default PlaylistHeader;
