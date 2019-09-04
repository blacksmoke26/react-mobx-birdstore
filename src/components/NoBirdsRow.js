// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link http://junaidatari.com Author Website
 * @since 2019-09-04
 */

import React from 'react';

type Props = {
};

const NoBirdsRow = ( props: Props ) => {
	return (
		<tr className="bg-white" {...props}>
			<td colSpan="5" className="text-center align-middle pt-3 pb-3">
			<span className="text-danger">
				<strong>Sorry!</strong> No birds are available.
			</span>
			</td>
		</tr>
	);
};

export default NoBirdsRow;

