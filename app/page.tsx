"use client";

import FilterSection from "@/components/FilterSection/FilterSection";
import Header from "@/components/Header/Header";
import ListSection from "@/components/ListSection/ListSection";
import { useBreweryData } from "@/context/BreweryContext";
import styles from "./home.module.css";

export default function Home() {
  const { breweries, selectedState, error, isLoading } = useBreweryData();

  if (error) {
    return (
      <div>
        <h2>Error fetching data!</h2>
        <p>Details: {error.message}</p>
        {error.statusCode && <p>Status Code: {error.statusCode}</p>}
      </div>
    );
  }

  return (
    <>
      <Header />
      {isLoading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {!isLoading && !!breweries.length && selectedState !== "" && (
        <main className={styles.main}>
          <FilterSection />
          <ListSection />
        </main>
      )}
      {!isLoading && !breweries.length && selectedState !== "" && (
        <h1>Invalid state entered</h1>
      )}
    </>
  );
}
