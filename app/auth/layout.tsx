import GoogleOAuthButton from "@/components/google-oauth-button";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await getUser();
  if (user) redirect("/dashboard");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <GoogleOAuthButton />
      {children}
    </div>
  );
};

export default AuthLayout;
