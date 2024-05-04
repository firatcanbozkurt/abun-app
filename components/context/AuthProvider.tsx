import { supabase } from "../../supabase";
import { Session } from "@supabase/supabase-js";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      console.log(session);
      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("uuid", session.user.id)
          .single();
        setProfile(data || null);
      }
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true); // when session is not defined and we are trying to login
      setSession(session);
      fetchSession();
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading: loading,
        profile,
        isAdmin: profile?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
