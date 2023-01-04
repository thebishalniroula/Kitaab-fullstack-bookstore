import styles from "../styles/Nav.module.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
const Nav = () => {
  const navRef = useRef(null);
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [showUserDetails, setShowUserDetails] = useState(false);
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
      setUser(null);
      router.push("/login");
    }
  };
  const observer = new IntersectionObserver(
    ([e]) =>
      e.target.classList.toggle(`${styles.isPinned}`, e.intersectionRatio < 1),
    { threshold: [1] }
  );
  if (navRef.current) {
    observer.observe(navRef.current);
  }
  if (showUserDetails) {
    window.onmousedown = () => setShowUserDetails(() => false);
  }
  const currentTab = () => {
    console.log(router.asPath);
    if (router.asPath.includes("comics")) return "comics";
    else if (router.asPath.includes("novels")) return "novels";
    else if (router.asPath.includes("finance")) return "finance";
    else if (router.asPath.includes("selfhelp")) return "selfhelp";
    else if (router.asPath.includes("novels")) return "novels";
    else return "home";
  };

  const handleOnChange = async (e) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/search/${e.target.value}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);
    console.log(data.message);

    if (data.status === "success") setSearchResult(() => data.message);
  };
  console.log("searchResult", searchResult);
  return (
    <>
      <nav className={styles.nav} ref={navRef}>
        <Link href={"/"}>
          <div className={styles.logo}>Kitaab</div>
        </Link>
        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <input
              type="text"
              className={styles.searchField}
              placeholder="Search by title or author"
              onChange={handleOnChange}
            />
            <div className={styles.searchList}>
              {searchResult.map((item, idx) => {
                return (
                  <Link href={`/book/${item._id}`} key={idx}>
                    <div className={styles.searchItem}>
                      <Image
                        src={
                          item.image.includes("http")
                            ? item.image
                            : `${process.env.NEXT_PUBLIC_BASE_URL}/${item.image}`
                        }
                        height={90}
                        width={60}
                      ></Image>
                      <div className={styles.bookData}>
                        <p className={styles.searchTitle}>{item.title}</p>
                        <p className={styles.authors}>
                          {item.authors.join(", ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <div
              title="User"
              className={styles.cart}
              onClick={() => setShowUserDetails((prev) => !prev)}
            >
              <Image src={"/user.png"} height={35} width={35}></Image>

              <div
                className={`${styles.userDetails} ${
                  !showUserDetails && styles.show
                }`}
              >
                <h5>Signed in as</h5>
                <p>
                  Name: <span>{user.name}</span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
              </div>
            </div>
          </div>
          {/* {user.cartItems.length} */}
          <Link href={"/cart"}>
            <div
              title="Cart"
              className={styles.cart}
              data-content={`${user.cartItems.length}`}
            >
              <Image src={"/cart.png"} height={35} width={35}></Image>
            </div>
          </Link>
          {user.isUser && (
            <div className={styles.cart} onClick={logout} title="Logout">
              <Image src={"/logout.png"} height={20} width={20}></Image>
            </div>
          )}
        </div>
      </nav>
      {/* Linksssssssssss--------- */}
      <div className={styles.navLinks}>
        <p className={currentTab() === "home" && styles.active}>
          <Link href="/">Home</Link>
        </p>
        <p className={currentTab() === "comics" && styles.active}>
          <Link href="/category/comics">Comics</Link>
        </p>
        <p className={currentTab() === "finance" && styles.active}>
          <Link href="/category/finance">Finance</Link>
        </p>
        <p className={currentTab() === "selfhelp" && styles.active}>
          <Link href="/category/selfhelp">Self help</Link>
        </p>
        <p className={currentTab() === "novels" && styles.active}>
          <Link
            href="/category/novels"
            className={currentTab() === "novels" && styles.active}
          >
            Novels
          </Link>
        </p>
      </div>
    </>
  );
};

export default Nav;
