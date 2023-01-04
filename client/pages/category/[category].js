import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import { UserContext } from "../../context/UserContext";
import styles from "../../styles/Category.module.css";
const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/category/${category}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      const newBooks = data.message.map((book) => {
        let bookCopy = book;
        user?.cartItems.map((item) => {
          if (item.bookId === book._id) {
            bookCopy["isInCart"] = true;
          }
        });
        return bookCopy;
      });
      setBooks(newBooks);
    })();
  }, [category, user]);
  if (user)
    return (
      <main className={styles.main}>
        <h2 className={styles.title}>{category}</h2>
        <div className={styles.container}>
          <BookCard books={books} />
        </div>
      </main>
    );
};

export default Category;
