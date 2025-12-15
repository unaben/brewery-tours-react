import React from "react";
import { useBreweryData } from "@/context/BreweryContext";
import { handleCityCheckbox } from "@/utils/handleCityCheckbox";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import styles from "./FilterSection.module.css";

export default function FilterSection() {
  const {
    breweryTypeSelectOption,
    cities,
    breweryType,
    setBreweryType,
    setFilterCities,
  } = useBreweryData();

  return (
    <aside className={styles.filters}>
      <h2 className={styles.title}>Filter By</h2>

      <form
        id="filter-by-type-form"
        autoComplete="off"
        className={styles.typeForm}
      >
        <label htmlFor="filter-by-type" className={styles.label}>
          <h3>Type of Brewery</h3>
        </label>

        <select
          value={breweryType}
          onChange={(e) => setBreweryType(e.target.value)}
          name="filter-by-type"
          id="filter-by-type"
          className={styles["filter-select"]}
        >
          <option value="">Select a type...</option>
          {breweryTypeSelectOption.map((option) => (
            <option key={option.label} value={option.value}>
              {capitalizeFirstLetter(option.label)}
            </option>
          ))}
        </select>
      </form>

      <div className={styles.cityHeader}>
        <h3>Cities</h3>
        <button type="button" className={styles.clearButton}>
          clear all
        </button>
      </div>

      <form id="filter-by-city-form" className={styles.cityForm}>
        {cities.map((city, index) => {
          const cityLower = city.toLowerCase();
          const key = `${cityLower}-${index}`;

          return (
            <React.Fragment key={key}>
              <input
                type="checkbox"
                id={cityLower}
                name={cityLower}
                value={cityLower}
                onChange={(evt) => handleCityCheckbox(evt, setFilterCities)}
                className={styles.checkbox}
              />
              <label htmlFor={cityLower} className={styles.cityLabel}>
                {city}
              </label>
            </React.Fragment>
          );
        })}
      </form>
    </aside>
  );
}
