// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link http://junaidatari.com Author Website
 * @since 2019-09-04
 */

import React, {useState} from 'react';
import { observer } from 'mobx-react';
import { Table, Form } from 'react-bootstrap';

// Types
import type { BirdProps } from './store/BirdStore';

// Stores
import { useBirdStore } from './store/BirdStore';

// Components
import BirdItem from './components/BirdItem';
import BirdsAvailable from './components/BirdsAvailable';
import NoBirdsRow from './components/NoBirdsRow';

function App () {
	const store = useBirdStore();
	
	const [value, setValue] = useState('');
	const [filterName, setFilterName] = useState('');
	
	const submitHandler = e => {
		e.preventDefault();
		
		const name = String(value).trim().substring(0, 30);
		
		if ( name.length > 2 ) {
			store.addBird({name});
			setValue('');
		}
		
		return false;
	};
	
	return (
		<div className="mt-4 container">
			<h1><span className="text-primary">React-MobX</span> Birds Shop</h1>
			<hr/>
			<Table bordered hover responsive striped size={"sm"}>
				<thead>
				<tr>
					<th className="align-middle" width="40px">&nbsp;</th>
					<th className="align-middle">#</th>
					<th className="align-middle">
						<div className="mb-1">Name</div>
						<Form.Control value={filterName}
						onChange={e => setFilterName(String(e.target.value||'').trim())}
						autoComplete="off"
						size="sm"
						type="text" placeholder="Filter name" />
					</th>
					<th className="align-middle text-center" width="80px">Status</th>
					<th>&nbsp;</th>
				</tr>
				</thead>
				<tbody>
					{store.birds
						.filter(b => !filterName || b.name.toLowerCase().includes(filterName.toLowerCase()))
						.map((bird: BirdProps, i: number) =>
							<BirdItem index={++i} bird={bird}
								key={bird.id} onRemoveClick={id => store.deleteBird(id)}/>
						)
					}
					<NoBirdsRow hidden={store.total}/>
				</tbody>
			</Table>
			
			<div className="pt-2 pb-4">
				<BirdsAvailable count={store.totalAvailable} hidden={!store.total}/>
				{store.totalSold
					? <>{' | '}<a href="/#"
						onClick={e => {e.preventDefault(); store.deleteAllSoldOut()}}>
						Remove sold out</a></>
					: null
				}
			</div>
			
			<div>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Control value={value}
							onChange={e => setValue(String(e.target.value||'').trim())}
							autoComplete="off" required
							pattern=".{3,30}" title="Either 3 or 30 chars for a valid name"
							type="text" placeholder="Enter bird name to add" />
					</Form.Group>
				</Form>
			</div>
		</div>
	);
}

export default observer(App);
