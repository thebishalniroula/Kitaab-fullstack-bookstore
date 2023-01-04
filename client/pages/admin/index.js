import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AddNewBook from "../../components/admin/AddNewBook";
import { UserContext } from "../../context/UserContext";
import styles from "../../styles/admin/Home.module.css";

const Index = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("ANB");
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/admin/login");
    }
  }, []);
  if (user?.isAdmin)
    return (
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div
            className={
              currentTab === "ANB"
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab}`
            }
            onClick={() => setCurrentTab(() => "ANB")}
          >
            Add new book
          </div>
          <div
            className={
              currentTab === "EEB"
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab}`
            }
            onClick={() => setCurrentTab(() => "EEB")}
          >
            Edit existing book
          </div>
        </div>
        {currentTab === "ANB" && <AddNewBook />}
      </div>
    );
};

export default Index;
