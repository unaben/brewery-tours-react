import { FetchError } from "@/hooks/useFetchData.types";
import { BreweryList, BreweryType } from "@/types/interface";
import { Dispatch, SetStateAction } from "react";

export type IBreweryContext = {
  selectedStateInput: string;
  setSelectedStateInput: Dispatch<SetStateAction<string>>;
  filterCities: Array<string>;
  setFilterCities: Dispatch<SetStateAction<Array<string>>>;
  breweryType: string;
  setBreweryType: Dispatch<SetStateAction<string>>;
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
  breweries: BreweryList;
  isLoading: boolean;
  error: FetchError | null;
  cities: Array<string>;
  breweryTypeSelectOption: Array<{
    value: BreweryType;
    label: string;
  }>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  breweriesData: BreweryList;
};
