import styles from "../styles/Login.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
const Login = () => {
  const [message, setMessage] = useState("");

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
    if (!email) {
      setMessage("Email cannot be empty.");
      return;
    }
    if (!password) {
      setMessage("Password cannot be empty.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (res.status === 401) {
        return setMessage("Please recheck your login credentials.");
      }
      const data = await res.json();
      if (data.status === "success") {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Kitaab</div>
        <p>
          Your go to online shop to buy all your favourite books at one place.
        </p>
        <div className={styles.card}>
          <p className={styles.message}>{message}</p>

          <form method="POST">
            <input
              name="name"
              type="email"
              placeholder="Email"
              ref={emailRef}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
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

export default Login;
