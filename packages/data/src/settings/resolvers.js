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

function settingsToSettingsResource( settings ) {
	return settings.reduce( ( resource, setting ) => {
		resource[ setting.id ] = setting.value;
		return resource;
	}, {} );
}

export function* getSettingsForGroup( group ) {
	yield dispatch( STORE_NAME, 'setIsPersisting', group, true );

	try {
		const url = NAMESPACE + '/settings/' + group;
		const results = yield apiFetch( {
			path: url,
			method: 'GET',
		} );

		const resource = settingsToSettingsResource( results );

		return updateSettingsForGroup( group, { [ group ]: resource } );
	} catch ( error ) {
		return updateErrorForGroup( group, null, error.message );
	}
}
