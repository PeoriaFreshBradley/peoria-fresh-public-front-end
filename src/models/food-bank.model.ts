import { Ticket } from "./ticket.model";

export interface FoodBank {
	id: number;

	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;

	phone: string;
	website: string;

	hours: string;

	tickets: Ticket[];
}
