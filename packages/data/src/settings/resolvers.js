/** @format */

/**
 * External Dependencies
 */

import { apiFetch, dispatch } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../constants';
import { STORE_NAME } from './constants';
import { updateSettingsForGroup, updateErrorForGroup } from './actions';

function settingsToSettingsResource( resourceName, settings ) {
	return settings.reduce( ( resource, setting ) => {
		const { id, ...data } = setting;
		resource[ id ] = data;
		return resource;
	}, {} );
}

export function* getSettings( group ) {
	yield dispatch( STORE_NAME, 'setIsPersisting', group, true );

	try {
		const url = NAMESPACE + '/settingsdfasdfs/' + group;
		const results = yield apiFetch( {
			path: url,
			method: 'GET',
		} );

		const resource = settingsToSettingsResource( group, results );

		return updateSettingsForGroup( group, resource );
	} catch ( error ) {
		return updateErrorForGroup( group, null, error.message );
	}
}
