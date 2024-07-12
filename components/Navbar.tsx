import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-secondary px-32">
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Signup</Link>
      </Button>
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
};

export default Navbar;
