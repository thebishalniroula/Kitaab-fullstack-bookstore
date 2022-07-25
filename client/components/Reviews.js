import styles from "../styles/Reviews.module.css";
import Review from "./Review";
const Reviews = ({ reviews }) => {
  return (
    <>
      <div className={styles.container}>
        {reviews.length > 0 ? (
          reviews.map((item) => <Review key={item.id} item={item} />)
        ) : (
          <p className={styles.na}>No reviews yet.</p>
        )}
      </div>
    </>
  );
};

export default Reviews;
