"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import useFetchData from "@/hooks/useFetchData";
import type { BreweryType, Brewery } from "@/types/interface";
import { extractCitiesData } from "@/utils/extractCitiesData";
import type { IBreweryContext } from "./BreweryContext.types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { filteredBreweries } from "@/utils/filteredBreweries";
import { foundBreweriesByName } from "@/utils/foundBreweriesByName";
import { foundBreweriesByType } from "@/utils/foundBreweriesByType";

const BreweryContext = createContext<IBreweryContext | undefined>(undefined);

const BreweryContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedStateInput, setSelectedStateInput] = useState<string>("");
  const [filterCities, setFilterCities] = useState<Array<string>>([]);
  const [breweryType, setBreweryType] = useState<BreweryType | string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const url = `/api/breweries?state=${selectedState}`;
  const { data: breweries, isLoading, error } = useFetchData<Brewery>(url);

  const cities = useMemo(() => {
    const citiesData = extractCitiesData(breweries);
    return citiesData;
  }, [breweries]);

  const breweryUniqueTypes = [
    ...new Set(breweries.map((brewery) => brewery.brewery_type)),
  ];

  const breweryTypeSelectOption = breweryUniqueTypes.map((type) => ({
    value: type,
    label: capitalizeFirstLetter(type) ?? "",
  }));

  const filteredBreweriesBySelectedCities = filteredBreweries(
    breweries,
    filterCities
  );

  const breweriesData = searchTerm
    ? foundBreweriesByName(filteredBreweriesBySelectedCities, searchTerm)
    : breweryType
    ? foundBreweriesByType(filteredBreweriesBySelectedCities, breweryType)
    : filteredBreweriesBySelectedCities;

  const value = useMemo(
    (): IBreweryContext => ({
      selectedStateInput,
      setSelectedStateInput,
      filterCities,
      setFilterCities,
      breweryType,
      setBreweryType,
      selectedState,
      setSelectedState,
      breweries,
      isLoading,
      error,
      cities,
      breweryTypeSelectOption,
      searchTerm,
      setSearchTerm,
      breweriesData,
    }),
    [
      breweries,
      breweryType,
      cities,
      error,
      filterCities,
      isLoading,
      selectedState,
      selectedStateInput,
      breweryTypeSelectOption,
      searchTerm,
      setSearchTerm,
      breweriesData,
    ]
  );

  return (
    <BreweryContext.Provider value={value}>{children}</BreweryContext.Provider>
  );
};

export default BreweryContextProvider;

export const useBreweryData = () => {
  const data = useContext(BreweryContext);

  if (data === undefined) {
    throw new Error("Layout must be wrapped in <BreweryContextProvider/>");
  }

  return data;
};
