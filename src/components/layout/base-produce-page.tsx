import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  setFilters,
  setProduceInfo,
} from "../../state/slices/produce-list-slice";
import { instance as axios } from "../../axios-instance";
import { RootState } from "../../state/store";
import { SearchFilter } from "../designs/search-filter";
import { Produce } from "../../models/produce.model";
import APIURL from "../../APIURL";
import { PFButton, PFListButton } from "../designs/custom-button";
import caretDown from "../../images/icons/caretDown.svg";
import { miniReqArr } from "../../models/mini-req.model";

type SortMethod = {
  name: string;
  sortFunction: (a: Produce, b: Produce) => number;
};

type FilterMethod = {
  name: string;
  key: string;
  value: string;
}

// these are the props that can be passed to the base produce page from a produce page that implements it
type BaseProducePageProps = {
  pageTitle: string;
  extraComponents?: React.ReactNode[];
  sortMethods?: SortMethod[];
  filterMethods?: {
    filterTypes: FilterMethod[];
  };
  produceItem: (produce: Produce) => React.ReactNode;
  produceCart: (reqList: miniReqArr, onClose: () => void) => React.ReactNode;
  cartListString: string; // using a string is probably not the best way to handle this, but if we used a useAppSelector object, then the whole page would reload every time the object changes
};

export const BaseProducePage = (props: BaseProducePageProps) => {

  const [currentFilterTypeIndex, setCurrentFilterTypeIndex] = useState(0);
  const [currentSortTypeIndex, setCurrentSortTypeIndex] = useState(0);

  const changeFilterType = () => {
    if (props.filterMethods) {
      const nextIndex = (currentFilterTypeIndex + 1) % props.filterMethods.filterTypes.length;
      setCurrentFilterTypeIndex(nextIndex);
    }
  };

  const changeSortType = () => {
    if (props.sortMethods) {
      const nextIndex = (currentSortTypeIndex + 1) % props.sortMethods.length;
      setCurrentSortTypeIndex(nextIndex);
    }
  };

  const dispatch = useAppDispatch();

  // list of produce from the redux store
  const produce = useAppSelector(
    (state: RootState) => state.produceList.produce
  );

  //lists of produce sorted by the sort methods from props
  const [sortedProduce, setSortedProduce] = useState<Produce[][]>([]);

  // determines whether to show the loading spinner on the page
  const [loading, setLoading] = useState(false);

  // filters from the redux store (this is currently only the search bar keyword, but it could be more)
  const filters = useAppSelector(
    (state: RootState) => state.produceList.filters
  );

  // the backend recognizes -1 as no limit to page size
  // we used to use pagination on the produce pages, so that's why the functionality is built in, but it's not used anymore
  const pageSize = -1;
  const page = useAppSelector((state: RootState) => state.produceList.page);

  // sorts the produce lists whenever the sort methods or the produce list from the redux store changes
  useEffect(() => {
    setSortedProduce(() => {
      if (!props.sortMethods) return [];

      const s = new Array(props.sortMethods.length).fill([]);

      for ( let i = 0; i < (props.sortMethods ? props.sortMethods.length : 0); i++ ) {
        let p = JSON.parse(JSON.stringify(produce));
        p.sort(props.sortMethods[i].sortFunction);
        s[i] = p;
      }

      return s;
    });
  }, [props.sortMethods, produce]);

  // method that gets a list of produce from the backend based on page information and filters
  const getData = useCallback(async () => {
    setLoading(true);

    // sets basic request parameters
    const params: { [key: string]: any } = {
      page,
      limit: pageSize,
      includeExtra: true,
    };

    // adds the current filter option to the request parameters
    if (props.filterMethods) {
      params[props.filterMethods.filterTypes[currentFilterTypeIndex].key]
        = props.filterMethods.filterTypes[currentFilterTypeIndex].value;
    }

    // adds filters from the redux store to the request parameters (this currently only includes keywords from the search bar)
    filters.forEach((filter) => {
      Object.keys(filter).forEach((key) => {
        // @ts-ignore
        params[key] = filter[key];
      });
    });

    // hits the backend with request
    const response = await axios.get(`${APIURL}/produce`, {
      params,
    });

    // updates the redux store with the response data
    dispatch(setProduceInfo({
      produce: response.data.data,
      pages: response.data.metadata.pages,
      numObjects: response.data.data.length,
    }));
    setLoading(false);
  }, [dispatch, filters, page, pageSize, props.filterMethods, currentFilterTypeIndex]);

  // runs the getData function whenever the getData function changes
  useEffect(() => {
    if (axios.defaults.headers.common["Authorization"] !== undefined) {
      getData();
    }
  }, [getData]);


  const cartWidth = "50vh";
  const [showCart, setShowCart] = useState(false);

  // decides whether to show the cart based on whether there are items in the cart
  const [cartOpen, setCartOpen] = useState(true);

  // gets the actual value from the redux store based on the cartList string from props
  const cartList = useAppSelector((state: RootState) => {
    const cartListString = props.cartListString.split(".");
    let cartList: any = state;
    for (let i = 0; i < cartListString.length; i++) {
      if (cartList[cartListString[i]] === undefined) {
        return [];
      }
      cartList = cartList[cartListString[i]];
    }
    return cartList;
  });

  useEffect(() => {
    setShowCart(cartList.length > 0);
  }, [cartList]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 2,
          height: "100%",
        }}
      >
        <Box
          sx={{
            flex: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            marginBottom: "8px",
            width: `calc(100% - ${cartOpen ? "0px" : cartWidth})`,
          }}
        >
          {/*Header for main content*/}
          <Box>
            <Typography
              variant="h3"
              sx={{
                // height: "100%",
                display: "flex",
                textAlign: "left",
                fontWeight: "bold",
                marginLeft: "40px",
                marginBottom: "35px",
                marginTop: "25px",
              }}
            >
              {props.pageTitle}
            </Typography>
          </Box>
          {props.extraComponents &&
            props.extraComponents.map((component, index) => (
              <Box key={index} sx={{ width: "30%" }}>
                {component}
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Box>
            <SearchFilter setFilters={setFilters} />
          </Box>
          {props.filterMethods && (
            <Box sx={{marginRight: "20px"}}>
              <PFButton
                text={"Filtered: " + props.filterMethods.filterTypes[currentFilterTypeIndex].name}
                onClick={() => {
                  changeFilterType();
                }}
              />
            </Box>
          )}
          {props.sortMethods && (
            <Box>
              <PFButton
                text={"Sorted: " + props.sortMethods[currentSortTypeIndex].name}
                onClick={() => {
                  changeSortType();
                }}
              />
            </Box>
          )}
        </Box>

        {/*Produce List*/}
        <Box
          sx={{
            padding: "16px 2px 0px 8px",
            flex: 1,
            display: "flex",
          }}
        >
          {
            // if not loaded
            loading ? (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CircularProgress
                    size={75}
                    thickness={5}
                    sx={{ marginY: "100px" }}
                  />
                </Grid>
              </Grid>
            ) : (
              // if loaded
              <Grid container spacing={2} style={{ justifyContent: "left" }}>
                {props.sortMethods && sortedProduce[currentSortTypeIndex] ? (
                  // if there are sort methods, display the sorted produce
                  sortedProduce[currentSortTypeIndex].length > 0 ? (
                    sortedProduce[currentSortTypeIndex].map((item: Produce) => (
                      <Grid item xs={"auto"} key={"pid" + item.id}>
                        {props.produceItem(item)}
                      </Grid>
                    ))
                  ) : (
                    // if the list of produce is empty, we assume it is because the backend did not have any data that matched the filters
                    <Grid item xs={"auto"}>
                      <Typography variant="h6" sx={{ marginLeft: "32px" }}>
                        No produce can be found that matches the search term and filters.
                      </Typography>
                    </Grid>
                  )
                ) : (
                  // if there are no sort methods, display the produce in the default order
                  produce.length > 0 ? (
                    produce.map((item: Produce) => (
                      <Grid item xs={"auto"} key={"pid" + item.id}>
                        {props.produceItem(item)}
                      </Grid>
                    ))
                  ) : (
                    // same as above but for unsorted produce
                    <Grid item xs={"auto"}>
                      <Typography variant="h6" sx={{ marginLeft: "32px" }}>
                        No produce can be found that matches the search term and filters.
                      </Typography>
                    </Grid>
                  )
                )}
              </Grid>
            )
          }
        </Box>
      </Box>

      {showCart && (
        <Box>
          {
            // if cart is open and there are items in the cart, display the cart
            cartOpen ? (
              <Box
                sx={{
                  height: `calc(100vh - 94px)`, // 94px is the height of the navBar
                  position: "sticky",
                  width: cartWidth,
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  top: "0px",
                }}
              >
                {props.produceCart(cartList, () => setCartOpen(false))}
              </Box>
            ) : (
              // if cart is closed, display the button to open the cart
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    width: cartWidth,
                    height: "42px",
                    right: "0px",
                    top: "0px",
                    position: "absolute",
                  }}
                >
                  <PFListButton
                    text="Your Produce"
                    iconURL={caretDown}
                    onClick={() => setCartOpen(true)}
                    sx={{
                      width: "100%",
                      borderRadius: "0px",
                      justifyContent: "space-between",
                    }}
                  />
                </Box>
              </Box>
            )
          }
        </Box>
      )}
    </Box>
  );
};
