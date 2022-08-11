import Nav from "./Nav";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import AdminNav from "./admin/AdminNav";
const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user?.isUser && <Nav />}
      {user?.isAdmin && <AdminNav />}
      {children}
    </div>
  );
};

export default Layout;
