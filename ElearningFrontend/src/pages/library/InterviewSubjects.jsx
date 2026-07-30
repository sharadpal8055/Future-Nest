import { useEffect, useState } from "react";
import SubjectCard from "../../components/library/SubjectCard";
import { getSubjects } from "../../services/interview.service";

function InterviewSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubjects() {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading subjects...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Interview Questions
        </h1>

        <p className="mt-2 text-gray-500">
          Choose a subject and start practicing interview
          questions.
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-gray-500">
          No interview subjects available.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewSubjects;