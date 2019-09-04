// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link http://junaidatari.com Author Website
 * @since 2019-09-04
 */

import React from 'react';

type Props = {
	count: number,
	hidden?: boolean,
}

function BirdsAvailable ( {count, hidden = false}: Props ) {
	if ( hidden ) {
		// noinspection JSConstructorReturnsPrimitive
		return null;
	}
	
	if ( !count ) {
		return (
			<span className="text-danger">
				<strong>Sorry!</strong> All birds are sold out.
			</span>
		);
	}
	
	return count === 1
		? <span>Only one bird available at a moment.</span>
		: <span>We have {count} birds available.</span>
}

export default BirdsAvailable;
