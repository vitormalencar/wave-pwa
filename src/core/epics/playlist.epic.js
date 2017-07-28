import {map} from 'rxjs/add/operator/map';
import {catch as observableCatch} from 'rxjs/add/operator/catch';
import {mergeMap} from 'rxjs/add/operator/mergeMap';

import {getPlaylist} from '../api';
import {resolvePlaylist} from '../actions/playlist.actions';
import {LOAD_PLAYLIST, RESOLVE_PLAYLIST} from '../constants/playlist.constants';

const requestPlaylistEpic = (action$) =>
	action$
		.ofType(LOAD_PLAYLIST)
    .mergeMap(() => getPlaylist()
      .map(({response}) => resolvePlaylist(response))
      .observableCatch((err) => console.log(err))
    );

export default requestPlaylistEpic;
