import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import InterviewQuestion from "../src/models/InterviewQuestion.js";
import InterviewSubject from "../src/models/InterviewSubject.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const files = fs
      .readdirSync(__dirname)
      .filter(
        (file) =>
          file.endsWith(".json") &&
          file !== "subjects.json"
      );

    let inserted = 0;
    let skipped = 0;

    for (const file of files) {
      console.log(`📄 Processing ${file}`);

      const questions = JSON.parse(
        fs.readFileSync(path.join(__dirname, file), "utf8")
      );

      for (const q of questions) {
        const subject = await InterviewSubject.findOne({
          name: q.subject,
        });

        if (!subject) {
          console.log(`❌ Subject not found: ${q.subject}`);
          continue;
        }

        const exists = await InterviewQuestion.findOne({
          subject: subject._id,
          question: q.question,
        });

        if (exists) {
          skipped++;
          continue;
        }

        await InterviewQuestion.create({
          subject: subject._id,
          question: q.question,
          answer: q.answer,
          difficulty: q.difficulty,
          tags: q.tags,
        });

        inserted++;
      }
    }

    console.log("\n=======================");
    console.log(`✅ Inserted : ${inserted}`);
    console.log(`⏭️ Skipped : ${skipped}`);
    console.log("=======================");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();