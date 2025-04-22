import { Growing } from "./growing.model";
import { Delivery } from "./delivery.model";

export interface Gardener {
	id: number;

	name: string;
	email: string;
	password: string;

	growings: Growing[];
	deliveries: Delivery[];
}
