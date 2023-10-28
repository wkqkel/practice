import { PacmanLoader } from "react-spinners";
import styles from "./ScreenLoader.module.scss";

const ScreenLoader = () => {
  return (
    <div className={styles.screenLoader}>
      <PacmanLoader color="rgba(54, 215, 183, 1)" />
    </div>
  );
};

export default ScreenLoader;
