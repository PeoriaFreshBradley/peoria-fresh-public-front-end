import { Ticket } from "./ticket.model";

export enum ProduceType {
	ROOT = 0,
	FRUIT = 1,
	VEGETABLE = 2,
	GRAIN = 3,
}

export enum DifficultyLevel {
	EASY = 0,
	MEDIUM = 1,
	HARD = 2,
}

export interface Produce {
	id: number;
	unitMultiplier: number;
	smallPhotoURL: string;
	largePhotoURL: string;
	name: string;
	otherNames: any[];
	description: string;
	type: string;
	difficulty: string;
	weeks: number;
	growingZone: string;
	season: string;
	extra: any;
}
