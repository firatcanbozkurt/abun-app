import { supabase } from "../../supabase";
import { useQuery } from "@tanstack/react-query";

export const useAnnouncementList = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("id, src_image");

        if (error) {
          console.error("Error fetching all events:", error.message);
          return;
        }

        const announcementData = [];

        const imageUrlPromises = data.map(async (announcement) => {
          const { data: imageData, error: imageError } = await supabase.storage
            .from("announcements")
            .getPublicUrl(announcement.src_image);
          if (imageError) {
            console.error("Error fetching image:", imageError.message);
            return null;
          }

          announcementData.push({
            uri: imageData.publicUrl,
            id: announcement.id,
          });
        });

        await Promise.all(imageUrlPromises);
        console.log("/*/*/*/*/*/*/*/*/*", announcementData);
        return announcementData;
      } catch (error) {
        console.error("Error fetching all events:", error.message);
      } finally {
        setLoading(false);
      }
    },
  });
};
