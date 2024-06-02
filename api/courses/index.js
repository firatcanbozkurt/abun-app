import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";



export const useVocabularyCourses = () => {
    return useQuery({
      queryKey:["courses"],
      queryFn: async  () => {
        try {
          const {data, error} = await supabase.from("courses").select("*");
          if(error){
            throw new Error(error.message);
          }
          return data.map(course => ({
            ...course,
            courseId: course.id        }));

        } catch (error) {
          console.log("Error fetching items", error);
        }
      }
    })
  }

  export const useVocabularyList = (courseId) => {
  return useQuery({
    queryKey: ["vocabularyItems", courseId], 
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("vocabulary_items")
          .select("*")
          .eq("course_id", courseId);
        if (error) {
          throw new Error(error.message);
        }
        return data;
      } catch (error) {
        console.log("Error fetching items", error);
      }
    },
  });
}