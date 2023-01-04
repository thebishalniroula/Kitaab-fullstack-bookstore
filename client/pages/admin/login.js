import styles from "../../styles/Login.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
const Login = () => {
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const otpFormRef = useRef(null);
  const inputCredentials = useRef({ email: null, password: null });
  useEffect(() => {
    if (user?.isAdmin) {
      router.push("/admin");
    } else if (!user?.isAdmin) {
      router.push("/admin/login");
    }
  }, []);

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/login`,
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
        inputCredentials.current.email = email;
        inputCredentials.current.password = password;
        setShowOtpBox(() => true);
      } else if (data.status === "error") {
        setMessage("Plese recheck your login credentials.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtpInput = (event) => {
    setMessage("");
    if (event.target.value.length > event.target.getAttribute("maxLength"))
      event.target.value = e.target.value.slice(
        0,
        e.target.getAttribute("maxLength")
      );
    else if (event.target.value.length === 1) {
      const index = parseInt(event.target.getAttribute("data-id"));
      otpFormRef.current.childNodes[index + 1]?.focus();
    }
  };
  const submitOtp = async (e) => {
    const email = inputCredentials.current.email;
    console.log(email);
    let otp = [];
    otpFormRef.current.childNodes.forEach((input) => otp.push(input.value));
    otp = otp.join("");

    if (otp.length !== 5) {
      return setMessage("OTP must be 5 digits long");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/login/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: inputCredentials.current.email,
          password: inputCredentials.current.password,
          otp,
        }),
      }
    );
    console.log(res.status);
    if (res.status === 400) {
      return setMessage("Please recheck your otp.");
    }
    const data = await res.json();
    console.log(data);
    if (data.status === "error") {
      setMessage(data.message);
    } else if (data.status === "success") {
      setUser(data.user);
      router.push("/admin");
      setMessage("Login success!");
    }
  };
  const resendOtp = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/login/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: inputCredentials.current.email,
          password: inputCredentials.current.password,
        }),
      }
    );
    const data = await res.json();
    if ((data.status = "success")) {
      setMessage("OTP resent successfully.");
      otpFormRef.current.childNodes.forEach((input) => (input.value = ""));
    }
  };

  if (!user?.isAdmin)
    return (
      <>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.logo}>Kitaab</div>
            <p>Admin Login </p>
            <div className={styles.card}>
              <p className={styles.message}>{message}</p>
              {showOtpBox && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <strong style={{ fontSize: "1.1rem" }}>
                    Please enter your OTP{" "}
                  </strong>
                  <form
                    ref={otpFormRef}
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      type="number"
                      placeholder=""
                      maxLength="1"
                      onInput={handleOtpInput}
                      style={{ width: "3rem" }}
                      data-id="0"
                    />
                    <input
                      type="number"
                      placeholder=""
                      maxLength="1"
                      onInput={handleOtpInput}
                      style={{ width: "3rem" }}
                      data-id="1"
                    />
                    <input
                      type="number"
                      placeholder=""
                      maxLength="1"
                      onInput={handleOtpInput}
                      style={{ width: "3rem" }}
                      data-id="2"
                    />
                    <input
                      type="number"
                      placeholder=""
                      maxLength="1"
                      onInput={handleOtpInput}
                      style={{ width: "3rem" }}
                      data-id="3"
                    />
                    <input
                      type="number"
                      placeholder=""
                      maxLength="1"
                      onInput={handleOtpInput}
                      style={{ width: "3rem" }}
                      data-id="4"
                    />
                  </form>
                  <button
                    className={styles.primary}
                    type="submit"
                    onClick={submitOtp}
                  >
                    Verify OTP
                  </button>
                  <strong>Didnt get an OTP? </strong>
                  <button className={styles.secondary} onClick={resendOtp}>
                    Resend OTP
                  </button>
                </div>
              )}
              {!showOtpBox && (
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
                  <strong>Next you will have to verify your OTP.</strong>
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default Login;
