import { BreweryList } from "@/types/interface";

export const foundBreweriesByName = (breweries: BreweryList, searchTerm: string) => {
    return breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  