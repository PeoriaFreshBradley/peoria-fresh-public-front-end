import { FoodBank } from "./food-bank.model";
import { Growing } from "./growing.model";
import { ProduceRequest } from "./produce-request.model";
import { Produce } from "./produce.model";
import { User } from "./user.model";

export interface ProduceTicket {
  id: number;
  request: ProduceRequest;

  amount: number;
  unit: string;

  plantedDate?: Date;
  expectedHarvestDate?: Date;
  actualHarvestDate?: Date;

  gardener: User;
  foodBank: FoodBank;
}

export interface Ticket {
  id: number;

  amount: number;
  requestDate: Date;
  fulfilled: boolean;

  produce: Produce;
  foodBank: FoodBank;
  growings: Growing[];
}
export interface Request {
  plantingDate: Date;
  produceName: string;
  gardenerName: string;
  amount: Number;
  status: string;
  expectedHarvest: Date;
  deliveryDate: Date;
  growingID: Number;
}
