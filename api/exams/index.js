import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";

export const useExamList = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("past_exams").select("*");

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


export const useVocabularyList = () => {
  return useQuery({
    queryKey:["vocabularyItems"],
    queryFn: async  () => {
      try {
        const {data, error} = await supabase.from("vocabulary_items").select("*");
        if(error){
          throw new Error(error.message);
        }
        return data;
      } catch (error) {
        console.log("Error fetching items", error);
      }
    }
  })
}