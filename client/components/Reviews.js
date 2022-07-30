import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Reviews.module.css";
import Review from "./Review";
const Reviews = ({
  reviews: { otherReviews, yourReviews },
  bookId,
  setYourReviews,
}) => {
  const { user } = useContext(UserContext);
  console.log("Your reviews", yourReviews);
  if (user)
    return (
      <>
        <div className={styles.container}>
          {yourReviews.length > 0 && (
            <div className={styles.reviewWrapper}>
              <p className={styles.reviewTitle}>Your review</p>
              <Review
                bookId={bookId}
                item={yourReviews[0]}
                isUserReview={true}
                setYourReviews={setYourReviews}
              />
            </div>
          )}

          {otherReviews.length > 0 ? (
            <div className={styles.reviewWrapper}>
              <p className={styles.reviewTitle}>
                Other reviews ({otherReviews.length})
              </p>
              {otherReviews.map((item) => (
                <Review
                  bookId={bookId}
                  key={item.id}
                  item={item}
                  setYourReviews={setYourReviews}
                />
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
