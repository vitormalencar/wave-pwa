import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {Router, Route} from 'preact-router';

// Load offline plugin only on production
process.env.NODE_ENV === 'production' && require('./offline');
process.env.NODE_ENV === 'development' && require('preact/devtools');

import Home from './pages/Home';
import ErrorPage from './components/404';

import store from './store';

import './style/index.scss';

render(
	<Provider store={store}>
	<Router>
		<Home path='/'/>
		<ErrorPage default/>
	</Router>
</Provider>, document.body);
