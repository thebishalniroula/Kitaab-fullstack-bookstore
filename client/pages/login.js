import styles from "../styles/Login.module.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
const login = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  if (user) {
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const res = await fetch(`http://localhost:5000/api/auth/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log("resData", data);
    if (data.status === "success") {
      setUser(data.user);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Bookly</div>
        <p>
          Your go to online shop to buy all your favourite books at one place.
        </p>
        <div className={styles.card}>
          <form method="POST">
            <input type="email" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button
              className={styles.primary}
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Login
            </button>
            <strong>Dont have an account? Register insted.</strong>
            <Link href="/register">
              <button className={styles.secondary}>Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
