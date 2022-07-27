import styles from "../styles/Login.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";

const register = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    const data = await res.json();

    if (data?.errors) {
      setMessage(data.errors[0].msg);
    }
    if (data.status === "success") {
      router.push("/login");
    } else if (data.status === "error") {
      setMessage(data.message);
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
            <input type="text" placeholder="Full name" ref={nameRef} />
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button
              className={styles.primary}
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Register
            </button>
            <strong>Already have an account? Login insted.</strong>
            <Link href="/login">
              <button className={styles.secondary}>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
