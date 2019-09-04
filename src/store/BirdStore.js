// @flow

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link http://junaidatari.com Author Website
 * @since 2019-09-03
 */

import { createContext, useContext } from 'react';
import { observable, action, computed } from 'mobx';

let _birdPk: number = 1;

export type BirdProps = {
	id: number,
	name: string,
	sold?: boolean,
}

class Bird {
	id: number;
	@observable name: string;
	@observable sold: boolean;
	
	constructor ( values: {name: string, sold?: boolean} ) {
		this.id = _birdPk++;
		this.name = values.name;
		this.sold = values.sold || false;
	}
}

class BirdStore {
	@observable birds: Array<Bird> = [
		new Bird({name: 'Parrot', sold: true}),
		new Bird({name: 'Sparrow'}),
	];
	
	/** Add new bird */
	@action addBird = ( bird: { name: string, sold: boolean } ): Bird => {
		const model = new Bird(bird);
		this.birds.push(model);
		return model;
	};
	
	/** Delete bird by ID */
	@action deleteBird = ( id: number ): void => {
		const index: number = this.birds.findIndex(b => b.id === id);
		
		if ( index !== undefined ) {
			this.birds.splice(index, 1);
		}
	};
	
	/** Delete all sort out */
	@action deleteAllSoldOut = (): void => {
		if ( this.totalSold ) {
			this.birds = this.birds.filter(b => !b.sold);
		}
	};
	
	@computed get total (): number {
		return this.birds.length;
	}
	
	@computed get totalAvailable (): number {
		return this.birds.filter(b => !b.sold).length;
	}
	
	@computed get totalSold (): number {
		return this.birds.length - this.totalAvailable;
	}
}

const store = createContext(new BirdStore());

export function useBirdStore (): BirdStore {
	return useContext(store);
}
