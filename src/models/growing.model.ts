import { Gardener } from "./gardener.model";
import { Produce } from "./produce.model";
import { Ticket } from "./ticket.model";

export interface Growing {
	id: number;

	amount: number;
	expectedHarvest: Date;
	plantingDate: Date;
	deliveryDate: Date;

	status: string;

	ticket: Ticket;
	produce: Produce;
	gardener: Gardener;

	extra?: any;
}
