import Modal from "../components/Modal";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Alert from "../components/Alert";

export default function Layout() {
  return (
    <>
      <Alert />
      <Nav />
      <main style={{ minHeight: '100vh', marginBottom: 16 }}>
        <Outlet />
      </main>
      <Modal />
    </>
  )
}