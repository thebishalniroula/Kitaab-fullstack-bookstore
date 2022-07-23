import styles from "../styles/Nav.module.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
const Nav = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const logout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      router.push("/login");
      setUser(null);
    }
  };
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>Bookly</div>
        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <input
              type="text"
              className={styles.searchField}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            {/* <Image src={userPng} layout="fill" /> */}
          </div>
          <div className={styles.cart}>{user.cartItems.length}</div>
          {user.isUser && <p onClick={logout}>Logout</p>}
        </div>
      </nav>
      {/* Linksssssssssss--------- */}
      <div className={styles.navLinks}>
        <a href="#" className={styles.active}>
          Home
        </a>
        <a href="#">Comics</a>
        <a href="#">Finance</a>
        <a href="#">Self help</a>
        <a href="#">Novels</a>
      </div>
    </>
  );
};

export default Nav;
