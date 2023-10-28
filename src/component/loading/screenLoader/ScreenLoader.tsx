import { PacmanLoader } from "react-spinners";
import styles from "./ScreenLoader.module.scss";

const ScreenLoader = () => {
  return (
    <div className={styles.screen}>
      <PacmanLoader color="#eabe10" className={styles.loader} />
    </div>
  );
};

export default ScreenLoader;
