import type { BreweryList } from "@/types/interface";

export function extractCitiesData(breweries: BreweryList) { 
    const cities = breweries.map((brewery) => brewery.city);  
    return [...new Set(cities)].sort();
  }