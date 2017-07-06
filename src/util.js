import {bindActionCreators} from 'redux';

const bindActions = (actions) => dispatch => ({
	...bindActionCreators(actions, dispatch)
});

export default bindActions;
