import Nav from "./Nav";
import { useEffect } from "react";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();
  const user = null;
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, []);
  // if (!user) {
  //   return;
  // }
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
