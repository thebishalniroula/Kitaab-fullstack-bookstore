import React, { useRef, useState } from "react";
import styles from "../../styles/admin/AddNewBook.module.css";

const AddNewBook = () => {
  // const [formData, setFormData] = useState({});
  const imageRef = useRef(null);
  const formRef = useRef(null);
  // const handleOnChange = (e) => {
  //   setFormData((prev) => {
  //     return { ...prev };
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formRef.current);
    const data = new FormData(formRef.current);
    console.log(data);
    // (async () => {
    //   const res = await fetch("http://localhost:5000/api/books/admin/add", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: data,
    //   });
    //   // const data = await res.json();
    // })();
  };
  const handleOnChange = () => {};
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <label>Book title</label>
          <input
            name="title"
            type="text"
            placeholder="Ice and fire"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" type="text" placeholder="Description" />
        </div>
        <div>
          <label>Authors</label>
          <input
            name="authors"
            type="text"
            placeholder="Bishal Niroula, Mohan"
          />
        </div>
        <div>
          <label>Category</label>
          <select>
            <option value="uncategorised">Uncategorised</option>
            <option value="comics">Comics</option>
            <option value="novels">Novels</option>
            <option value="finance">Finance</option>
            <option value="selfhelp">Self help</option>
          </select>
        </div>
        <div>
          <label>Price(NRs)</label>
          <input type="number" placeholder="1200" />
        </div>
        <div>
          <label>Stock</label>
          <input type="number" placeholder="100" />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            ref={imageRef}
          />
        </div>
        <button className={styles.submit} onClick={handleSubmit}>
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
