import Layout from "../components/Layout";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const url = router.pathname.includes("/admin")
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/isLoggedIn`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/isLoggedIn`;
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        } else if (
          !router.pathname.includes("/register") &&
          !router.pathname.includes("/admin")
        )
          router.push("/login");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (!user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
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
