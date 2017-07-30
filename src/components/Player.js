import {h} from 'preact';

const Player = ({currentTrack, isPlaying, play}) => (

  <div class={isPlaying
    ? 'player playing'
    : 'player'}>

    <a
      onClick={play}
      role="button"
      class="playControls__playPause g-touch-padding sc-selection-disabled">
      <span class="sc-visuallyhidden">play or pause music</span>
    </a>

    <a class="nowPlaying">
			<img
      class="nowPlaying__artwork"
      src={currentTrack.artwork_url}
      width="40"
      height="40"
      alt="Retro"/>
      <span class="nowPlaying__title truncate">{currentTrack.title}</span>
      <span class="nowPlaying__username truncate">{currentTrack.user.username}</span>
    </a>
  </div>
);

export default Player;
