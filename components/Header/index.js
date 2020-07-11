import styles from "./index.module.scss";

import links from "./links";
import Logo from "../Logo";
import Link from "next/link";

const Nav = () => (
  <nav className={styles.nav}>
    <ul>
      {links.map(({ href, name }) => (
        <li key={href + name}>
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Logo />
        <Nav />
      </div>
    </header>
  );
};

export default Header;