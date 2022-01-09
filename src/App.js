import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Article from "./components/Article";
import ControlBox from "./components/ControlBox";
import Popup from "./components/Popup";
import { ReactComponent as Wave } from "./wave.svg";
import { ReactComponent as Divider } from "./divider.svg";

function App() {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [texts, setTexts] = useState([]);

  async function Fetch() {
    const response = await fetch(
      "https://daily-english-reading.herokuapp.com/"
    );
    const json = await response.json();

    setTitle(json.title);
    setTexts(json.texts);
    setLoading(false);
  }

  useEffect(() => {
    Fetch();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [loadingTls, setLoadingTls] = useState(true);
  const [tlsWord, setTlsWord] = useState("");

  async function getTranslatedWord(e) {
    setIsClicked(true);
    const response = await fetch(
      "https://daily-english-reading.herokuapp.com/translate",
      {
        method: "POST",
        body: JSON.stringify({ targetWord: e.target.innerText }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setTlsWord(json.translatedWord);
    setLoadingTls(false);
  }
  function reset() {
    setIsClicked(false);
    setLoadingTls(true);
  }
  window.addEventListener("mousedown", reset);

  const [page, setPage] = useState(0);

  const pageUp = () => setPage((prev) => (prev += 1));
  const pageDown = () => setPage((prev) => (prev > 0 ? (prev -= 1) : 0));

  return (
    <div className={styles.container}>
      <Popup loading={loadingTls} word={tlsWord} disabled={!isClicked} />
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}></div>
        </div>
      ) : (
        <div className={styles.gridBox}>
          <div className={styles.title}>
            <Wave className={styles.wave} />
            <Divider className={styles.divider} />
            <p>BBC News</p>
            <h2>{title}</h2>
          </div>
          <div className={styles.article}>
            <Article text={texts[page]} onMouseUp={getTranslatedWord} />
          </div>
          <div className={styles.controlBox}>
            <ControlBox
              pageUp={pageUp}
              pageDown={pageDown}
              page={page}
              lastPage={texts.length - 1}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
