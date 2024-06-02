import { supabase } from "./supabase";

const courses = [
  {
    name: "CENG 471",
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

// async function addVocab(courses: any) {
//   courses.forEach(async (course) => {
//     const [insert, fetch] = await Promise.allSettled([
//       supabase.from("courses").insert(course.name),
//       supabase.from("courses").eq("name", "asdf"),
//     ]);

//     courses.vocab.forEach(async (voc) => {
//       await supabase.from("vocabulary_items").insert([
//         {
//           word: voc.word,
//           description: voc.definition,
//           course_id: "",
//         },
//       ]);
//     });
//   });
// }
