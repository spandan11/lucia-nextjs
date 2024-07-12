"use client";

import { getUser } from "@/lib/lucia";
import { useEffect, useState } from "react";
import type { Session, User } from "lucia";

// type User = {
//   id: string;
//   email: string;
//   picture: string;
// };

interface Data {
  user: ExtendedUser | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

interface ExtendedUser extends User {
  id: string;
  email: string;
  picture: string | null;
}

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (!response?.session?.id || !response?.user?.id) {
          throw new Error("Failed to fetch user");
        }
        setUser(response.user);
        setSession(response.session);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, session]);

  return { user, session, loading, error };
};

export default useSession;
