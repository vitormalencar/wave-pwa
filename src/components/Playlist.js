import {h} from 'preact';
import PlaylistItem from './PlaylistItem';

const Playlist = ({playlist, selectCurrentTrack}) => (
	<section class="lower">
		<div class="bar"></div>
		<ul class='list'>
			{playlist.map(track => <PlaylistItem track={track} selectCurrentTrack={selectCurrentTrack}/>)}
		</ul>
</section>
);

export default Playlist;
