import Layout from "../components/Layout";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/isLoggedIn`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data?.user) {
        setUser(data.user);
      } else if (!router.pathname.includes("/register")) router.push("/login");
    })();
  }, []);

  if (!user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />;
      </UserContext.Provider>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
