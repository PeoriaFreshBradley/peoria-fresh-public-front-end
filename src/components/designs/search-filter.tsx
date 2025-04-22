import { Box, TextField, InputAdornment } from "@mui/material";
import { RootState } from "../../state/store";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import searchIcon from "../../images/icons/search.svg"
import { useState } from "react";

interface SearchFilterProps {
  setFilters: Function;
}

export const SearchFilter = ({ setFilters }: SearchFilterProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(
    (state: RootState) => state.produceList.filters
  );

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // this method will make sure that the search function is only called after the user has stopped typing for 200ms
  // if the user continues typing, the timer will be reset
  // it is here because calling the search function too many times in a short period of time will cause performance issues
  const waitThenSearch = (searchTerm: string) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerId(setTimeout(() => {
      search(searchTerm);
    }, 200));
  }

  const search = (searchTerm: string) => {
    console.log("searching...");
    if (searchTerm.length > 0) {
      dispatch(
        setFilters([
          ...filters.filter((filter) => !filter.searchValue && !filter.searchKey),
          { searchValue: searchTerm },
          { searchKey: "name" },
        ])
      );
    } else {
      dispatch(
        setFilters(
          filters.filter((filter) => !filter.searchValue && !filter.searchKey)
        )
      );
    }
  };

  return (
    <Box sx={{ flex: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        sx={{ backgroundColor: "var(--base_site_MTColorLight, #fffbf8)", width: "420px", marginLeft: "40px", marginRight: "40px"}}
        onChange={(e: any) => waitThenSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={searchIcon} alt=""/>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};
