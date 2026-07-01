import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import type { ReactNode } from "react";
import styles from "../layouts/MainLayout.module.css"


interface MainLayoutProps {
    children: ReactNode;
}



export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
        <div className={styles.layout}>
            <Header />

            <main className={styles.main}>
                {children}
            </main>

            <Footer />
        </div>
        </>
    )
}