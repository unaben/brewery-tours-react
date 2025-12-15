import type { BreweryList, BreweryType } from "@/types/interface";

export const foundBreweriesByType = (
  breweries: BreweryList,
  breweryType: BreweryType | string
) =>
  breweries.filter((brewery) =>
    brewery["brewery_type"].toLowerCase().includes(breweryType.toLowerCase())
  );
