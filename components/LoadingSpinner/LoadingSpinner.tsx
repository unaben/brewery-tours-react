import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
      <p className={styles.text}>Loading breweries…</p>
    </div>
  );
}
