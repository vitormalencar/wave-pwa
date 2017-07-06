import {h, Component} from 'preact';
import {connect} from 'preact-redux';

import bindActions from '../util';
import {rootReducer} from '../store';
import {CLIENT_ID} from '../core/api';

import {loadPlaylist, selectCurrentTrack, updateIsPlaying} from '../core/actions/playlist.actions';

import Layout from '../components/Layout';
import Player from '../components/Player';
import Playlist from '../components/Playlist';
import ActionButton from '../components/ActionButton';
import PlaylistHeader from '../components/PlaylistHeader';

let _player = document.createElement('audio');

@connect(rootReducer, bindActions({loadPlaylist, selectCurrentTrack, updateIsPlaying}))
export default class Home extends Component {

  playMusic = () => {
    this.state.playlist.isPlaying
      ? _player.play()
      : _player.pause();
  }

  updateCurrentTrack = (storePlaylist) => {
    const {currentTrack} = this.state.playlist || {};
    if (currentTrack && currentTrack.id !== storePlaylist.currentTrack.id) {
      this.setState({playlist:storePlaylist});
      this.loadTrack();
    }
  }


  xlArtwork = (url) => {
    if (url) {
      return url.replace(/large/, 't200x200');
    }
  }

  loadTrack = () => {
    let sorceURl = `${this.state.playlist.currentTrack.stream_url}?client_id=${CLIENT_ID}`;
    _player.src = sorceURl;
  }

  randomTrack = () => {
    const {playlist} = this.state;
    const {trackLength} = playlist;

    // Pick a random number
    const randomNumber = Math.floor((Math.random() * trackLength) + 1);
    const currentTrack = playlist.tracks[randomNumber];

    // Set the track state with a random track from the playlist
    this.props.selectCurrentTrack(currentTrack);

  }

  syncState = ({getState}) => {
    const {playlist} = getState();
    this.updateCurrentTrack(playlist);
    this.setState({playlist});
    this.playMusic();
  };

  // TODO change this to a Stop action in V2
  resetPlayerState = (isPlaying) => {
    if (isPlaying) {
      this.props.updateIsPlaying();
    }
  };

  componentWillMount() {
    const {store} = this.context;
    const {playlist} = store.getState();

    this.resetPlayerState(playlist.isPlaying);
    this.syncState(store);
    this.loadTrack();
    this.props.loadPlaylist();
    this.unsubscribe = store.subscribe(() => this.syncState(store));
  }

  componentDidUnmount() {
    this.unsubscribe();
  }

  // Preact pass props and state directly to render
  render({
    updateIsPlaying,
    selectCurrentTrack
  }, {playlist}) {
    return (
      <Layout>
        {playlist && <div>
          <PlaylistHeader {...playlist} xlArtwork={this.xlArtwork}/>

          <ActionButton randomTrack={this.randomTrack}/>

          <Playlist playlist={playlist.tracks} selectCurrentTrack={selectCurrentTrack}/>

          <Player
            play={updateIsPlaying}
            currentTrack={playlist.currentTrack}
            isPlaying={playlist.isPlaying}/>
        </div>}
      </Layout>
    );
  }
}
