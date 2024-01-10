import { LogoutButton, LoginButton } from "@/components/auth";
import Image from "next/image";
import logoPng from "@/images/logo2.png";
import Link from "next/link";

async function Header({ user }) {
  return (
    <div className="w-full py-1 px-5 flex justify-between items-center bg-white bg-opacity-50 shadow-sm text-gray-800">
      <div className="mb-2 px-4 flex justify-center ">
        <Link href={"/"}>
          <Image
            className="w-24 object-cover object-center"
            src={logoPng}
            alt="logo"
          />
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          Hey, {user?.first_name}!
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default Header;
