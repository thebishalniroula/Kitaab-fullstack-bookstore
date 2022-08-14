import React, { useContext } from "react";
import styles from "../styles/BookCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "../utils";
import { UserContext } from "../context/UserContext";
const BookCard = ({ books, type = "user" }) => {
  const { setUser } = useContext(UserContext);
  return (
    <>
      {books.map((book) => {
        return (
          <div className={styles.book} key={book._id}>
            <Link
              href={
                type === "user" ? `/book/${book._id}` : `/admin/${book._id}`
              }
            >
              <div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={
                      book.image.includes("http")
                        ? book.image
                        : `${process.env.NEXT_PUBLIC_BASE_URL}${book.image}`
                    }
                    layout="fill"
                  />
                </div>
                <p className={styles.bookTitle}>{book.title}</p>
                {book?.authors && (
                  <p className={styles.author}>{book.authors[0]}</p>
                )}
              </div>
            </Link>
            {type !== "admin" && book?.isInCart && (
              <p className={styles.addedToCart}>Added to cart</p>
            )}
            {type !== "admin" && !book?.isInCart && (
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
