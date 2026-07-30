import slugify from "slugify";
import InterviewSubject from "../models/InterviewSubject.js";
import InterviewQuestion from "../models/InterviewQuestion.js";

/* =====================================================
   SUBJECTS
===================================================== */

// GET /interview/subjects
export const getSubjects = async (req, res) => {
  try {
    const subjects = await InterviewSubject.find().sort({
      order: 1,
      name: 1,
    });

    res.json({
      success: true,
      data: subjects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST /admin/interview/subject
export const createSubject = async (req, res) => {
  try {
    const { name, icon, order } = req.body;

    const exists = await InterviewSubject.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Subject already exists",
      });
    }

    const subject = await InterviewSubject.create({
      name,
      slug: slugify(name, {
        lower: true,
      }),
      icon,
      order,
    });

    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PUT /admin/interview/subject/:id
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, icon, order } = req.body;

    const subject = await InterviewSubject.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name, {
          lower: true,
        }),
        icon,
        order,
      },
      {
        new: true,
      },
    );

    res.json({
      success: true,
      data: subject,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE /admin/interview/subject/:id
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    await InterviewQuestion.deleteMany({
      subject: id,
    });

    await InterviewSubject.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Subject deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   QUESTIONS
===================================================== */

// GET /interview/questions/:subjectId
export const getQuestions = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const questions = await InterviewQuestion.find({
      subject: subjectId,
    }).sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST /admin/interview/question
export const createQuestion = async (req, res) => {
  try {
    const { subject, question, answer, difficulty, tags } = req.body;

    const created = await InterviewQuestion.create({
      subject,
      question,
      answer,
      difficulty,
      tags,
    });

    res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PUT /admin/interview/question/:id
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await InterviewQuestion.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE /admin/interview/question/:id
export const deleteQuestion = async (req, res) => {
  try {
    await InterviewQuestion.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Question deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
