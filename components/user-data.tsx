"use client";

import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import useSession from "../hooks/useSession";
// import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { signOut } from "firebase/auth";
import { LoadingButton } from "./ui/loading-button";
import { lucia } from "@/lib/lucia";

const UserData = () => {
  // const [user] = useAuthState(auth);
  const router = useRouter();
  const data = useSession();
  // const [error, setError] = useState<string>("");
  // const [userData, setUserData] = useState<any>(null);
  // const [mounted, setMounted] = useState(false);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (!mounted) return;

  //   const fetchUser = async () => {
  //     const userSession = sessionStorage.getItem("user");
  //     if (!userSession) {
  //       setError("User not logged in.");
  //       return;
  //     }

  //     try {
  //       const response = await fetch("/api/user", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: userSession,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (err: any) {
  //       setError("Please Login to Proceed.");
  //     }
  //   };

  //   fetchUser();
  // }, [mounted, user]);

  // if (!mounted) {
  //   return null;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // if (!userData) {
  //   return <p>Loading...</p>;
  // }

  // if (!user && !sessionStorage.getItem(lucia.sessionCookieName)) {
  //   router.push("/auth/login");
  // }
  if (!data) {
    router.push("/auth/login");
  }

  return (
    <div className="bg-gray-300 p-4 rounded-lg">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <LoadingButton
        loading={loading}
        onClick={() => {
          setLoading(true);
          signOut(auth)
            .then(() => {
              sessionStorage.removeItem("user");
              router.push("/auth/login");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        Logout
      </LoadingButton> */}
    </div>
  );
};

export default UserData;
