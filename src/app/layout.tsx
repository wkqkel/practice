import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/reset.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/component/layout/Layout";
import Auth from "@/component/auth/Auth";
import RecoilRootProvider from "@/provider/RecoilRootProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootProvider>
          <Auth>
            <Layout>
              {children}
              <ToastContainer />
            </Layout>
          </Auth>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
