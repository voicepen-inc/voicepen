import styles from "./index.module.scss";

const Logo = () => {
  return (
    <span className={styles.logo}>
      <span className={styles.voice}>VOICE</span>
      <span className={styles.pen}>PEN</span>
    </span>
  );
};

export default Logo;
