/** @format */

/**
 * External Dependencies
 */

import { apiFetch } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { NAMESPACE } from '../constants';
import { updateSettingsForGroup } from './actions';

function settingsToSettingsResource( resourceName, settings ) {
	return settings.reduce( ( resource, setting ) => {
		const { id, ...data } = setting;
		resource[ id ] = data;
		return resource;
	}, {} );
}

export function* getSettings( group ) {
	const url = NAMESPACE + '/settings/' + group;

	const results = yield apiFetch( {
		path: url,
		method: 'GET',
	} );

	const resource = settingsToSettingsResource( group, results );

	return updateSettingsForGroup( group, resource );
}
