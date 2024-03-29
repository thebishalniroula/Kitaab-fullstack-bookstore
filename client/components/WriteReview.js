import styles from "../styles/WriteReview.module.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
const WriteReview = ({ id, setYourReviews }) => {
  const { user } = useContext(UserContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const reviewRef = useRef(null);
  const addReview = async () => {
    if (!reviewRef.current.value) {
      return setError("Please write a review before posting.");
    }
    if (!rating) {
      return setError("Please give a star rating before posting.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/add`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          stars: rating / 20,
          review: reviewRef.current.value,
        }),
      }
    );
    const data = await res.json();

    if (data.status === "success") {
      setYourReviews(() => [data.message]);
      setShowReviewForm(() => false);
    } else {
      setError(id);
    }
  };

  if (user)
    return (
      <>
        <div className={styles.container}>
          <p className={styles.cardTitle}>Write a review</p>
          <div
            className={styles.inputDiv}
            onClick={() => {
              setShowReviewForm(true);
            }}
          >
            Reading this book? Review and rate it here,{" "}
            {user.name.split(" ")[0]} ...
          </div>
        </div>
        {showReviewForm && (
          <div
            className={styles.reviewFormWrapper}
            onClick={(e) => {
              console.log(e.target.toString());
              setShowReviewForm(false);
            }}
          >
            <div
              className={styles.reviewForm}
              onClick={(e) => e.stopPropagation()}
            >
              <p className={styles.title} onClick={(e) => e.stopPropagation()}>
                Write review
              </p>
              <div className={styles.userDetails}>
                <div className={styles.avatar}>
                  <Image
                    src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
                    layout="fill"
                    alt="profile photo"
                  />
                </div>
                <div className={styles.usernameWrapper}>
                  <p className={styles.username}>{user.name}</p>
                  <p className={styles.privacy}>Public</p>
                </div>
              </div>
              <div
                className={styles.starRating}
                onClick={() => {
                  setError("");
                }}
              >
                <Rating
                  ratingValue={rating}
                  onClick={setRating}
                  initialValue={0}
                  iconsCount={5}
                  fillColor="#d57f07"
                  emptyColor="#a8a8a5"
                  size={28}
                />

                {rating > 0 && (
                  <p className={styles.rating}>
                    ({rating / 20} star{rating > 1 && "s"})
                  </p>
                )}
              </div>
              {error && <p className={styles.rating}>{error}</p>}
              <textarea
                className={styles.inputField}
                placeholder="Write your review..."
                onClick={(e) => e.stopPropagation()}
                autoFocus={true}
                ref={reviewRef}
                onChange={() => {
                  setError("");
                }}
              />
              <button
                className={styles.primary}
                onClick={(e) => {
                  e.stopPropagation();
                  addReview();
                }}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </>
    );
};

export default WriteReview;
