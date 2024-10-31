// StarBackground.tsx
import React from "react";
import styles from "../styles/StarContainer.module.scss";

const StarBackground: React.FC = () => {
  return (
    <div className={styles.skyContainer}>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
      <span className={styles.star}></span>
    </div>
  );
};

export default StarBackground;
