import styles from "./popup.module.css";

function Popup({ loading, word, disabled }) {
  return (
    <div className={styles.popup} hidden={disabled}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}></div>
        </div>
      ) : (
        <div className={styles.info}>
          <span>
            <span className="material-icons">import_contacts</span>
            <span className={styles.word}>{word}</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default Popup;
