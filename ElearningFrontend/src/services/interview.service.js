import axios from "../api/axios";

export const getSubjects = async () => {
  const { data } = await axios.get("/interview/subjects");
  return data;
};

export const getQuestions = async (
  subjectId,
  params = {}
) => {
  const { data } = await axios.get(
    `/interview/questions/${subjectId}`,
    {
      params,
    }
  );

  return data;
};

export const getQuestion = async (id) => {
  const { data } = await axios.get(
    `/interview/question/${id}`
  );

  return data;
};