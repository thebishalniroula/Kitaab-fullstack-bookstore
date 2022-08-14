import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/admin/AddNewBook.module.css";
import BookCard from "../BookCard";

const AddNewBook = () => {
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const [addedBooks, setAddedBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.status === "success") {
        setAddedBooks(() => data.message.slice(-10).reverse());
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    for (const [key, value] of formData) {
      console.log(key, value);
      if (key !== "image" && value === "") {
        setMessage("Please input all fields");
        return;
      }
      if (key === "image" && value.name === "") {
        setMessage("Please upload an image.");
      }
    }
    if (message !== "") {
      return;
    }
    (async () => {
      const res = await fetch("http://localhost:5000/api/books/admin/add", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setAddedBooks((prev) => [data.message, ...prev]);
        formRef.current.reset();
      } else if (data.status === "error") {
        setMessage(() => data.message);
      }
      console.log(...formData);
    })();
  };
  const handleOnChange = () => {};
  return (
    <>
      <p className={styles.message}>{message}</p>
      <div className={styles.container}>
        <form
          className={styles.form}
          encType="multipart/form-data"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h2>Add new book</h2>
          <div>
            <label>Book title</label>
            <input
              name="title"
              type="text"
              placeholder="Eg: Ice and fire"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              type="text"
              placeholder="Eg: Description"
            />
          </div>
          <div>
            <label>Authors</label>
            <input
              name="authors"
              type="text"
              placeholder="Eg: Bishal Niroula, Mohan Bisunke"
            />
          </div>
          <div>
            <label>Category</label>
            <select name="category">
              <option value="UNCATEGORISED">Uncategorised</option>
              <option value="COMICS">Comics</option>
              <option value="NOVELS">Novels</option>
              <option value="FINANCE">Finance</option>
              <option value="SELFHELP">Self help</option>
              <option value="EDUCATIONAL">Educational</option>
            </select>
          </div>
          <div>
            <label>Price(NRs)</label>
            <input type="number" placeholder="Eg: 1200" name="price" />
          </div>
          <div>
            <label>Stock</label>
            <input type="number" placeholder="Eg: 100" name="stock" />
          </div>
          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              ref={imageRef}
              name="image"
              className={styles.customFileInput}
            />
          </div>
          <button className={styles.submit} onClick={handleSubmit}>
            {" "}
            Submit
          </button>
        </form>
        <div className={styles.sidebar}>
          <h3>Recently added</h3>
          {addedBooks.length === 0 && (
            <p className={styles.na}>No books added recently</p>
          )}
          <div className={styles.recentlyAddedWrapper}>
            {addedBooks.length > 0 && (
              <BookCard books={addedBooks} type="admin" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewBook;
