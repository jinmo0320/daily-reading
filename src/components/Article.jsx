import { useState } from "react";
import styles from "./article.module.css";

function Article({ text, onMouseUp }) {
  const words = text.split(" ");

  return (
    <div className={styles.innerText}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={styles.word} onMouseUp={onMouseUp}>
            {word}
          </span>
          <span> </span>
        </span>
      ))}
    </div>
  );
}

export default Article;
