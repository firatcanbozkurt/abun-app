import { supabase } from "./supabase";

const courses = [
  {
    name: "CENG 470",
    vocab: [
      { word: "API", definition: "API" },
      { word: "API", definition: "API" },
      { word: "API", definition: "API" },
      { word: "API", definition: "API" },
    ],
  },
  {
    name: "CENG 578",
    vocab: [
      { word: "API", definition: "API" },
      { word: "API", definition: "API" },
      { word: "API", definition: "API" },
      { word: "API", definition: "API" },
    ],
  },
];

export async function addVocab() {
  courses.forEach(async (course) => {
    let course_id = "";
    await supabase
      .from("courses")
      .insert([{ name: course.name }])
      .then(async () => {
        await supabase
          .from("courses")
          .select("*")
          .eq("name", course.name)
          .single()
          .then((data) => {
            console.log("DATAAA§112:", data);
            course_id = data.data.id;
          });
      });

    course.vocab.forEach(async (voc) => {
      await supabase.from("vocabulary_items").insert([
        {
          word: voc.word,
          description: voc.definition,
          course_id,
        },
      ]);
    });
  });
}
