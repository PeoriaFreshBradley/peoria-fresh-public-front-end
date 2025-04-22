import { FoodBank } from "./food-bank.model";
import { Produce } from "./produce.model";
import { User } from "./user.model";

export interface ProduceRequest {
	id: number;
	produce: Produce;
	numPeople: number;
	usagePerWeek: number;

	requestedDate: Date;

	requestedBy: User;
	foodBank: FoodBank;
}
