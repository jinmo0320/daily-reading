import styles from "./controlBox.module.css";

function ControlBox({ pageUp, pageDown, page, lastPage }) {
  return (
    <div>
      <button className={styles.btn} onClick={pageDown} disabled={page <= 0}>
        Prev
      </button>
      <span className={styles.page}>
        {page + 1} / {lastPage + 1}
      </span>
      <button
        className={styles.btn}
        onClick={pageUp}
        disabled={page >= lastPage}
      >
        Next
      </button>
    </div>
  );
}

export default ControlBox;
