import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <div className="container py-5">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default DefaultLayout;