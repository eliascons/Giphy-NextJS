import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { UserContext, LogContext } from "../context/context.js";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSearch, FaSignInAlt } from 'react-icons/fa';
import { MdFavoriteBorder } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";

function Nav() {
  const { isLogged, setIslogged } = useContext(LogContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(async () => {
    try {
      const res = await axios.get("/api/user/username");
      setUser(res.data.user);
      setIslogged(true);
    } catch (e) {
      console.log(e);
      setIslogged(false);
    }
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setIslogged(false);
    await router.push("/");
  };

  const handleLogin = async () => {
    await router.replace("/containers/login");
  };

  return (
    <>
      <div className={styles.body}>
        <Link href="/">
          <a className={styles.links}>Home <AiFillHome/></a>
        </Link>
        <Link href="/containers/search">
          <a className={styles.links}>Search <FaSearch/></a>
          
        </Link>
        <Link href="/containers/saved">
          <a className={styles.links}>Saved <MdFavoriteBorder/> </a>
        </Link>

        <Link href="/containers/register">
          <a className={styles.links}>Register <FaSignInAlt/></a>
        </Link>
        <div className={styles.alignRight}>
        {!isLogged ? (
          <button onClick={handleLogin} className={styles.btn}>
            Login
          </button>
        ) : (
          <button onClick={handleLogout} className={styles.btn}>
            {user}
          </button>
        )}
      </div>
      </div>

    </>
  );
}

export default Nav;
