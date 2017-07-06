import {h} from 'preact';
import PlaylistItem from './PlaylistItem';

const Playlist = ({playlist, selectCurrentTrack}) => (
	<section class="lower">
		{ <div class="bar">
			<div class="slide">
				<div class="knob"></div>
			</div>
			<p>
				Available Offline
			</p>
		</div> }
		<ul class='list'>
			{playlist.map(track => <PlaylistItem track={track} selectCurrentTrack={selectCurrentTrack}/>)}
		</ul>
</section>
);

export default Playlist;
