import { useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";
import { FoodbankItem } from "./foodbank-helpers/foodbank-item";
import { Produce } from "../../models/produce.model";
import FoodbankCart from "./foodbank-helpers/foodbank-cart";
import { BaseProducePage } from "../../components/layout/base-produce-page";
import { miniReqArr } from "models/mini-req.model";

export const FoodbankProduce = () => {

  return (
    <BaseProducePage
      pageTitle="Request Produce"
      filterMethods={{
        filterTypes: [
          {name: "All", key: "", value: ""},
          {name: "Fruit", key: "type", value: "Fruit"},
          {name: "Root", key: "type", value: "Root"},
          {name: "Vegetable", key: "type", value: "Vegetable"}
      ]}}
      produceItem={(produce: Produce) => <FoodbankItem produce={produce} />}
      produceCart={(reqList: miniReqArr, onClose: () => void) => (
        <FoodbankCart reqs={reqList} onClose={onClose} />
      )}
      cartListString={"requestInfo.foodbankReqList"}
    />
  );
};
