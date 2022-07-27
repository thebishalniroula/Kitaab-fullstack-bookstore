import styles from "../styles/Review.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Rating } from "react-simple-star-rating";

const Review = ({ item }) => {
  const [showShowMore, setShowShowMore] = useState(true);
  const reviewRef = useRef(null);
  useEffect(() => {
    if (reviewRef.current) {
      const node = reviewRef.current;
      if (node.clientHeight == node.scrollHeight) {
        setShowShowMore(false);
      }
    }
  }, []);
  return (
    <>
      <div className={styles.review}>
        <div>
          <div className={styles.authorDetails}>
            <Image
              src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
              height={50}
              width={50}
              className={styles.avatar}
              alt="profile photo"
            />
            <div>
              <h4>{item.userId.name}</h4>
              <Rating
                initialValue={item.stars}
                iconsCount={5}
                readOnly={true}
                fillColor="#ffcd17"
                emptyColor="#a8a8a5"
                allowHover={false}
                size={20}
                className={styles.starRating}
              />

              {item.stars ? (
                <span>{`(${item.stars} stars)`}</span>
              ) : (
                <span className={styles.na}>{`Rating not availabe.`}</span>
              )}
            </div>
          </div>
          <p
            ref={reviewRef}
            className={`${styles.reviewContent} ${
              showShowMore ? styles.truncate : ""
            }`}
          >
            {item.review}
          </p>
          {showShowMore && (
            <span
              className={styles.showMore}
              onClick={() => {
                setShowShowMore(false);
              }}
            >
              Show more
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
