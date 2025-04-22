import { AddressType } from "components/maps";

export interface miniReq {
    name: string;
    id: number;
    amt: number;
    displayInPounds?: boolean;
    requestingLocations?: Array<AddressType>;
  }

  export interface miniReqArr extends Array<miniReq>{}