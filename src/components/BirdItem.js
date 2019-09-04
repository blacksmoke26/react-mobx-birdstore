// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link http://junaidatari.com Author Website
 * @since 2019-09-04
 */

import React from 'react';
import { Form, Badge } from 'react-bootstrap';
import type { BirdProps } from './../store/BirdStore';

type Props = {
	bird: BirdProps,
	index: number,
	onRemoveClick?: Function,
}

const BirdItem = ( {bird, index, ...props}: Props ) => (
	<tr>
		<td className="text-center">
			<Form.Check className="m-0" custom id={`bird-${bird.id}`}
				type="checkbox"
				label=""
				checked={bird.sold}
				value={Number(bird.sold)} onChange={() => bird.sold = !bird.sold}/>
		</td>
		<td>{index}</td>
		<td>{bird.sold ? <del className="font-italic">{bird.name}</del>: bird.name}</td>
		<td className="text-center">{bird.sold
			? <Badge pill className="font-weight-normal" variant="danger">Sold Out</Badge>
			: <Badge pill className="font-weight-normal" variant="success">Available</Badge>
		}
		</td>
		<td className="text-center">
			<a href="/#" className="text-danger text-decoration-none"
				title="Remove bird" onClick={e => {
				e.preventDefault();
				typeof props.onRemoveClick === 'function' && props.onRemoveClick.call(null, bird.id);
			}}>&times;</a>
		</td>
	</tr>
);

export default BirdItem;
