import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";

export const useClubList = () => {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("communities").select("*");

        if (error) {
          throw new Error(error.message); // Rethrow for Tanstack Query to handle
        }
        return data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching exams:", error); // Log any other errors
        throw error; // Rethrow for Tanstack Query to handle
      }
    },
  });
};

export const useNumberOfEvents = ({ id }) => {
  return useQuery({
    queryKey: ["#events", id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("events")
        .select("count", { count: "exact", head: "true" })
        .eq("community_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return count;
    },
  });
};

export const useNumberOfMembers = ({ id }) => {
  return useQuery({
    queryKey: ["#members", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("communities")
        .select("users"); // Use array_length for element count

      if (error) {
        throw new Error(error.message);
      }
      // Check if data exists and if the users array is not null
      return data;
    },
  });
};
