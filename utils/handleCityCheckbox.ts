import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleCityCheckbox = (
  event: ChangeEvent<HTMLInputElement> | undefined,
  setFilterCities: Dispatch<SetStateAction<Array<string>>>
) => {
  const cityValue = event?.target.value;
  if (!cityValue) return;

  setFilterCities((prevCities) =>
    prevCities.includes(cityValue)
      ? prevCities.filter((city) => city !== cityValue)
      : [...prevCities, cityValue]
  );
};
