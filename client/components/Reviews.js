import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Reviews.module.css";
import Review from "./Review";
const Reviews = ({ reviews: { otherReviews, yourReviews } }) => {
  const { user } = useContext(UserContext);

  if (user)
    return (
      <>
        <div className={styles.container}>
          {yourReviews.length > 0 && (
            <div className={styles.reviewWrapper}>
              <p className={styles.reviewTitle}>
                Your reviews ({yourReviews.length})
              </p>
              {yourReviews.map((item) => (
                <Review key={item.id} item={item} />
              ))}
            </div>
          )}

          {otherReviews.length > 0 ? (
            <div className={styles.reviewWrapper}>
              <p className={styles.reviewTitle}>
                Other reviews ({otherReviews.length})
              </p>
              {otherReviews.map((item) => (
                <Review key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className={styles.reviewWrapper}>
              <p className={styles.reviewTitle}>
                Other reviews ({otherReviews.length})
              </p>
              <p className={styles.na}>No reviews yet.</p>
            </div>
          )}
        </div>
      </>
    );
};

export default Reviews;
