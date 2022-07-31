import styles from "../../styles/admin/Home.module.css";

const index = () => {
  return (
    <div className={styles.container}>
      <h2>Choose an action</h2>
      <div className={styles.card}>Add new book</div>
      <div className={styles.card}>Edit existing book</div>
      <div className={styles.card}>Add book</div>
    </div>
  );
};

export default index;
