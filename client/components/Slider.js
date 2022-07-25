import styles from "../styles/Slider.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { addToCart } from "../utils";
const Slider = ({ popularBooks }) => {
  const { user, setUser } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    (async () => {
      const resPopularBooks = await fetch(
        `http://localhost:5000/api/books/popularnow`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const dataPB = await resPopularBooks.json();
      const newBooks = dataPB.message.map((book) => {
        let bookCopy = book;
        user.cartItems.map((item) => {
          if (item.bookId === book._id) {
            bookCopy["isInCart"] = true;
          }
        });
        return bookCopy;
      });
      setBooks(newBooks);
    })();
  }, [user]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Popular now</h3>
      <div className={styles.books}>
        {books.map((book) => {
          return (
            <div className={styles.book} key={book._id}>
              <Link href={`/book/${book._id}`}>
                <div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={book.image}
                      height={200}
                      width={133}
                      layout="fill"
                    />
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
      </div>
    </div>
  );
};

export default Slider;
<div className={styles.book}>
  <img
    src="https://static-01.daraz.com.np/p/c9b7ee2c314d78450a727a336258ce9a.jpg"
    alt=""
  />
  <p className={styles.bookTitle}>Game of thrones</p>
  <p className={styles.author}>George RR martin</p>
</div>;
