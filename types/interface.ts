export type BreweryType =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  street: string | null;
  city: string;
  state: string | null;
  state_province: string | null;
  postal_code: string | null;
  country: string;
  phone: string | null;
  website_url: string | null;
  latitude: number | null;
  longitude: number | null;
}

export type BreweryList = Array<Brewery>;
