import Header from "./Header";
import Footer from "./Footer";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <div className="bg-primary">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
