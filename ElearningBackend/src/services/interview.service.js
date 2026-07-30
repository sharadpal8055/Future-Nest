import InterviewSubject from "../models/InterviewSubject.js";
import InterviewQuestion from "../models/InterviewQuestion.js";

export const getAllSubjectsService = async () => {
  const subjects = await InterviewSubject.aggregate([
    {
      $lookup: {
        from: "interviewquestions",
        localField: "_id",
        foreignField: "subject",
        as: "questions",
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        icon: 1,
        order: 1,
        questionCount: {
          $size: "$questions",
        },
      },
    },
    {
      $sort: {
        order: 1,
      },
    },
  ]);

  return subjects;
};

export const getQuestionsBySubjectService = async (
  subjectId,
  query
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    subject: subjectId,
  };

  if (
    query.difficulty &&
    query.difficulty !== "All"
  ) {
    filter.difficulty = query.difficulty;
  }

  if (query.search) {
    filter.$or = [
      {
        question: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        answer: {
          $regex: query.search,
          $options: "i",
        },
      },
      {
        tags: {
          $regex: query.search,
          $options: "i",
        },
      },
    ];
  }

  const total = await InterviewQuestion.countDocuments(filter);

  const questions = await InterviewQuestion.find(filter)
    .select("-answer")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    questions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getQuestionByIdService = async (id) => {
  return await InterviewQuestion.findById(id)
    .populate("subject", "name slug")
    .lean();
};