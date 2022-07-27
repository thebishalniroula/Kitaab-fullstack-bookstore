import styles from "../styles/Excerpt.module.css";
const Excerpt = () => {
  const data = {
    vote_average: 3.5,
    popularity: 1500,
    release_date: 2020,
    languages: ["English", ["Hindi"]],
  };
  return (
    <div>
      <h2 className={styles.sticky}>About book</h2>
      <div className={styles.excerpt}>
        <div>
          <h4 className={styles.h4}>Rating</h4>
          <p className={styles.p}>
            {"⭐"}
            {` ${data.vote_average} (${data.vote_count} votes)`}
          </p>
        </div>
        <div>
          <h4 className={styles.h4}>Popularity score</h4>
          <p className={styles.p}>{`${data.popularity}`}</p>
        </div>
        <div>
          <h4 className={styles.h4}>Release date</h4>
          <p className={styles.p}>{` ${data.release_date}`}</p>
        </div>
        <div>
          <h4 className={styles.h4}>Languages</h4>
          <span className={styles.p}>{data.languages.join(", ")}</span>
        </div>
        <div>
          <h4 className={styles.h4}>Original language</h4>
          <p className={styles.p}>{`${data.original_language}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Excerpt;
