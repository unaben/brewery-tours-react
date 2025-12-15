import { useBreweryData } from "@/context/BreweryContext";
import styles from "./ListSection.module.css";

export default function ListSection() {
  const {
    breweriesData: filteredBreweries,
    searchTerm,
    setSearchTerm,
  } = useBreweryData();

  return (
    <>
      <h1 className={styles.title}>List of Breweries</h1>

      <header className={styles.searchBar}>
        <form
          id="search-breweries-form"
          autoComplete="off"
          className={styles.searchForm}
        >
          <label htmlFor="search-breweries" className={styles.searchLabel}>
            Search breweries:
          </label>

          <input
            id="search-breweries"
            name="search-breweries"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </form>
      </header>

      <article className={styles.article}>
        <ul className={styles.list}>
          {filteredBreweries.map((brewery) => (
            <li key={brewery.id}>
              <h2>{brewery.name}</h2>
              <div className={styles.type}>{brewery.brewery_type}</div>
              <section className={styles.address}>
                <h3>Address</h3>
                <p>{brewery.street}</p>
                <p>
                  <strong>
                    {brewery.city}, {brewery.postal_code}, {brewery.state}
                  </strong>
                </p>
              </section>
              <section className={styles.phone}>
                <h3>Phone</h3>
                <p>{brewery.phone || "N/A"}</p>
              </section>

              <section className={styles.link}>
                {brewery.website_url && (
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                )}
              </section>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
