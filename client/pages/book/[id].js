import styles from "../../styles/ProductPage.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { addToCart } from "../../utils";
import { UserContext } from "../../context/UserContext";
import Reviews from "../../components/Reviews";
import Excerpt from "../../components/Excerpt";
import WriteReview from "../../components/WriteReview";
const ProductPage = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [book, setBook] = useState({});
  const { id } = router.query;

  useEffect(() => {
    console.log("user", user);
    console.log(router.isReady);
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (user?.cartItems.length > 0) {
        user.cartItems.map((item) => {
          if (item.bookId === data.message._id) {
            setBook(() => {
              return { ...data.message, isInCart: true };
            });
          } else {
            setBook(() => {
              return { ...data.message, isInCart: false };
            });
          }
        });
      } else {
        setBook(() => {
          return { ...data.message, isInCart: false };
        });
      }
    })();
  }, [router.isReady, user]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bookDetails}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.authors}>
            By <span>{book?.authors?.join(", ")}</span>
          </p>
          <p className={styles.description}>{book.description}</p>
          <div className={styles.buttons}>
            {book.isInCart ? (
              <button className={`${styles.primary} ${styles.addedToCart}`}>
                Added to cart
              </button>
            ) : (
              <button
                className={styles.primary}
                onClick={() => {
                  addToCart(
                    book._id,
                    book.title,
                    book.image,
                    book.price,
                    setUser
                  );
                }}
              >
                Add to cart
              </button>
            )}
            <button className={styles.secondary}>Reviews</button>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.imageWrapper}>
            {book.image && <Image src={book.image} layout="fill"></Image>}
          </div>
        </div>
      </div>
      <div className={styles.postHeroWrapper}>
        <div className={styles.postHero}>
          <Excerpt />
          <div>
            <h2>Reviews</h2>
            <WriteReview />

            <Reviews
              reviews={[
                {
                  author: "Bishal Niroula",
                  author_details: { rating: 5 },
                  content:
                    "Lorem ipsum dollar sit. Herro bro how are you. I am fine very good what about you. Its is a very good book bro. You need to read it atleast once hehehe. Higly recommended",
                },
                {
                  author: "Bishal Niroula",
                  author_details: { rating: 5 },
                  content:
                    "Lorem ipsum dollar sit. Herro bro how are you. I am fine very good what about you. Its is a very good book bro. You need to read it atleast once hehehe. Higly recommended",
                },
                {
                  author: "Bishal Niroula",
                  author_details: { rating: 5 },
                  content:
                    "Lorem ipsum dollar sit. Herro bro how are you. I am fine very good what about you. Its is a very good book bro. You need to read it atleast once hehehe. Higly recommended",
                },
                {
                  author: "Bishal Niroula",
                  author_details: { rating: 5 },
                  content:
                    "Lorem ipsum dollar sit. Herro bro how are you. I am fine very good what about you. Its is a very good book bro. You need to read it atleast once hehehe. Higly recommended",
                },
                {
                  author: "Bishal Niroula",
                  author_details: { rating: 5 },
                  content:
                    "Lorem ipsum dollar sit. Herro bro how are you. I am fine very good what about you. Its is a very good book bro. You need to read it atleast once hehehe. Higly recommended",
                },
                {
                  author: "Bishal Niroula",
                  author_details: { rating: 5 },
                  content:
                    "Lorem ipsum dollar sit. Herro bro how are you. I am fine very good what about you. Its is a very good book bro. You need to read it atleast once hehehe. Higly recommended",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
