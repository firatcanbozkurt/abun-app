import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore?.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore?.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore?.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://rivyajuoigpvpgssytra.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdnlhanVvaWdwdnBnc3N5dHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwNDgxNzcsImV4cCI6MjAyMjYyNDE3N30.MjEGGR2rq4aYK-3Yaw1bgF8OeIjWbDZmRH9je526kQs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
