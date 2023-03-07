import React from "react";
import styles from "./NavBar.module.css";
function NavBar() {
  return (
    <nav>
      <ul className={styles.NavBarContainer}>
        <img
          className={styles.GoogleDocLogo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png"
          alt="googledoclogo"
        />
        <input className={styles.NavList} placeholder="Untitled document" />
      </ul>
    </nav>
  );
}

export default NavBar;
