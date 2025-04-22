import { useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";
import { GardenerItem } from "./gardener-helpers/gardener-item";
import { Produce } from "../../models/produce.model";
import GardenerCart from "./gardener-helpers/gardener-cart";
import { BaseProducePage } from "../../components/layout/base-produce-page";
import { miniReqArr } from "models/mini-req.model";

export const GardenerProduce = () => {

  return (
    <BaseProducePage
      pageTitle="Community Needs"
      sortMethods={[
        {
          name: "Name",
          sortFunction: (a: Produce, b: Produce) => {
            return a.name.localeCompare(b.name);
          },
        },
        {
          name: "Most Requested",
          sortFunction: (a: Produce, b: Produce) =>
            b.extra.totalAmount - a.extra.totalAmount,
        },
      ]}
      filterMethods={{
        filterTypes: [
          {name: "All", key: "", value: ""},
          {name: "Fruit", key: "type", value: "Fruit"},
          {name: "Root", key: "type", value: "Root"},
          {name: "Vegetable", key: "type", value: "Vegetable"}
      ]}}
      produceItem={(produce: Produce) => <GardenerItem produce={produce} />}
      produceCart={(reqList: miniReqArr, onClose: () => void) => (
        <GardenerCart reqs={reqList} onClose={onClose} />
      )}
      cartListString={"acceptingInfo.reqList"}
    />
  );
};
