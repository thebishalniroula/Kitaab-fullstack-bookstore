import styles from "../styles/Slider.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { addToCart } from "../utils";
import { useHorizontalScroll } from "../utils";
import BookCard from "./BookCard";
const Slider = ({ popularBooks }) => {
  const containerRef = useHorizontalScroll();
  const { user, setUser } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    (async () => {
      const resPopularBooks = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/popularnow`,
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
      <div className={styles.books} ref={containerRef}>
        <BookCard books={books} />
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
