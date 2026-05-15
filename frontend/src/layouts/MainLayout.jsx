import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const MainLayout = () => {
  return (
    <div style={styles.wrapper}>
      <Header /> 
      <main style={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  wrapper: { 
    display: "flex", 
    flexDirection: "column", 
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#ffffff", 
  },
  content: { 
    flex: 1, 
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff"
  }
};