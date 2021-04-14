import React, { useEffect, useState } from "react";
import styles from "../styles/nav.module.scss";
function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const listener = () => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setShow(true);
        } else {
          setShow(false);
        }
      });
    };
    listener();
    return () => {
      window.removeEventListener("scroll", listener, false);
    };
  }, []);

  return (
    <div className={show ? styles.nav : styles.navHidden}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className={styles.nav__logo}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix avatar"
        className={styles.nav__avatar}
      />
    </div>
  );
}

export default Nav;
