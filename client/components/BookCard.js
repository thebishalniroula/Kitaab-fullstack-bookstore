import React, { useContext } from "react";
import styles from "../styles/BookCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "../utils";
import { UserContext } from "../context/UserContext";
const BookCard = ({ books }) => {
  const { setUser } = useContext(UserContext);
  return (
    <>
      {books.map((book) => {
        return (
          <div className={styles.book} key={book._id}>
            <Link href={`/book/${book._id}`}>
              <div>
                <div className={styles.imageWrapper}>
                  <Image src={book.image} layout="fill" />
                </div>
                <p className={styles.bookTitle}>{book.title}</p>
                {book?.authors && (
                  <p className={styles.author}>{book.authors[0]}</p>
                )}
              </div>
            </Link>
            {book.isInCart ? (
              <p className={styles.addedToCart}>Added to cart</p>
            ) : (
              <p
                className={styles.addToCart}
                onClick={() =>
                  addToCart(
                    book._id,
                    book.title,
                    book.image,
                    book.price,
                    setUser
                  )
                }
              >
                Add to cart
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default BookCard;
