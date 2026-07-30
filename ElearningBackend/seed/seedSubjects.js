import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import InterviewSubject from "../src/models/InterviewSubject.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await mongoose.connect(process.env.MONGO_URI);

const subjects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "subjects.json"))
);

for (const subject of subjects) {
  await InterviewSubject.updateOne(
    { slug: subject.slug },
    { $set: subject },
    { upsert: true }
  );
}

console.log("✅ Subjects Seeded");
process.exit();