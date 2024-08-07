import Logo from "@/components/Logo";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-3 lg:py-5 mx-auto w-[600px]">
          <div className="w-60 mx-auto">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="mt-2">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
