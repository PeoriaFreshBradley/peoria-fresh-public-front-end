import { FoodBank } from "./food-bank.model";
import { Gardener } from "./gardener.model";

export enum UserType {
  ADMIN = 0,
  PATRON = 1,
  GARDENER = 2,
}

export interface User {
  id: number;
  email: string;
  password: string;

  isSystemAdmin: boolean;

  gardenerProfile?: Gardener;
  foodBankProfile?: FoodBank;
}
