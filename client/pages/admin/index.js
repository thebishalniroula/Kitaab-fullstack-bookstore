import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "../../styles/admin/Home.module.css";

const index = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/admin/login");
    }
  }, []);
  if (user?.isAdmin)
    return (
      <div className={styles.container}>
        <h2>Choose an action</h2>
        <div className={styles.card}>Add new book</div>
        <div className={styles.card}>Edit existing book</div>
        <div className={styles.card}>Add book</div>
      </div>
    );
};

export default index;
