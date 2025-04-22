import { Gardener } from "./gardener.model";
import { Produce } from "./produce.model";
import { User } from "./user.model";

export interface Delivery {
	id: number;

	amount: number;

	type: string;

	isVerified: boolean;
    verifiedAmount?: number;
	location: {
		address: string;
	}

    expectedDeliveryDate: string;

	produce: Produce;
	provider: Gardener;
}