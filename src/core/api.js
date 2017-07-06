import {ajax} from 'rxjs/observable/dom/ajax';

export const CLIENT_ID = 'gWXJ4a9ibqavnTgrBwnRdEe98wkKSGdX';

export const AjaxRequest = (method, url) => {
  const baseURL = 'https://api.soundcloud.com/';

  return ajax({
    method,
    timeout: 20000,
    responseType: 'json',
    crossDomain: true,
    url: `${baseURL}${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

};

export const getPlaylist = () => AjaxRequest('get', `playlists/14544054?client_id=${CLIENT_ID}&limit=30`);
