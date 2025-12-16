"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import FilterSection from "@/components/FilterSection/FilterSection";
import Header from "@/components/Header/Header";
import ListSection from "@/components/ListSection/ListSection";
import { useBreweryData } from "@/context/BreweryContext";
import styles from "./home.module.css";

export default function Home() {
  const { breweries, selectedState, error, isLoading } = useBreweryData();

  return (
    <div className={styles.container}>
      <Header />
      {isLoading && (
        <div className={styles.loader}>
        <LoadingSpinner />
      </div>
      )}
      {!isLoading && selectedState === "" && !error &&(
        <div className={styles.wrapper}>
          <h2>👋 Welcome!</h2>
          <p>Please select a state to view breweries</p>
        </div>
      )}      
      {!isLoading && !!breweries.length && selectedState !== "" && (
        <main className={styles.main}>
          <FilterSection />
          <ListSection />
        </main>
      )}
      {!isLoading && error && (
        <div className={styles.wrapper}>
          <h2>❌ Error fetching data!</h2>
          <p>{error.message}</p>
          {error.statusCode && <p>Status Code: {error.statusCode}</p>}
        </div>
      )}
    </div>
  );
}
