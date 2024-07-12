import React from "react";
import { getUser } from "../../lib/lucia";
import { redirect } from "next/navigation";
import { Button } from "../../components/ui/button";
import { SignOut } from "../auth/_actions/auth.action";
import SignOutButton from "@/components/signout-button";

const Dashboard = async () => {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  return (
    <div className="flex items-center justify-center gap-4 h-screen p-8">
      {/* <UserData /> */} This is Dashboard Page. It is server component.
      <pre className="bg-slate-300 p-4 rounded-lg">
        {JSON.stringify(user, null, 2)}
      </pre>
      <SignOutButton>Logout</SignOutButton>
    </div>
  );
};

export default Dashboard;
