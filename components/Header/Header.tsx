import { useBreweryData } from "@/context/BreweryContext";
import { handleSelectStateForm } from "@/utils/handleSelectStateForm";
import { handleSelectStateInput } from "@/utils/handleSelectStateInput";
import styles from "./Header.module.css";

export default function Header() {
  const {
    selectedState,
    selectedStateInput,
    setSelectedState,
    setBreweryType,
    setSelectedStateInput,
  } = useBreweryData();

  return (
    <header className={styles.header}>
      <section className={styles.section}>
        <h2 className={styles.title}>Welcome to Brewery Tours</h2>

        <form
          id="select-state-form"
          autoComplete="off"
          onSubmit={(evt) => {
            handleSelectStateForm(evt, selectedStateInput, setSelectedState);
            if (selectedState !== "") {
              setBreweryType("");
            }
          }}
          className={styles.form}
        >
          <label htmlFor="select-state" className={styles.label}>
            Which state are you visiting?
          </label>

          <input
            id="select-state"
            name="select-state"
            type="text"
            onChange={(evt) =>
              handleSelectStateInput(evt, setSelectedStateInput)
            }
            className={styles.input}
          />
        </form>
      </section>
    </header>
  );
}
