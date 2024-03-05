import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";

export const useExamList = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const {
        data,
        error,
      } = async () => await supabase.from("past_exams").select("*");

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
