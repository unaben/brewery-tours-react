import { BreweryList } from "@/types/interface";

export const filteredBreweries = (
  breweries: BreweryList,
  filterCities: Array<string>
) => {
  if (filterCities.length === 0) {
    return breweries;
  }
  const normalizedCities = filterCities.map((city) => city.toLowerCase());
  return breweries.filter((brewery) =>
    normalizedCities.includes(brewery.city.toLowerCase())
  );
};
