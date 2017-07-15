import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import {} from '../../src';
import ErrorPage from '../../src/components/404';

import store from '../../src/store';

/*global sinon, expect*/
function connect(WrappedComponent, ...props) {
	return (
		<Provider store={store}>
			<WrappedComponent {...props}/>
		</Provider>
	);
}

// describe('Test', () => {
//
// 	before( () => {
// 		node = document.createElement('div');
// 		(document.body || document.documentElement).appendChild(node);
// 	});
//
// 	beforeEach( () => {
// 		node.innerHTML = '';
// 	});
//
// 	after( () => {
// 		node.parentNode.removeChild(node);
// 		node = null;
// 	});
//
// 	describe('404 page', () => {
// 		it('should render a page with 404', () => {
// 			render(<ErrorPage />, node);
// 			expect(node.innerText).to.include('404');
// 		});
// 	});
//
// });
