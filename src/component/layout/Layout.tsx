import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className={styles.header}>
        <span>Logo</span>
        <button>Logout</button>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
