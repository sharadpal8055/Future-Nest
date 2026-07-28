import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import LessonItem from "./LessonItem";

export default function CourseProgress() {
  const { enrollmentId } = useParams();

  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollment = async () => {
      const res = await api.get("/enrollments/me");
      const found = res.data.data.find(e => e._id === enrollmentId);
      setEnrollment(found || null);
      setLoading(false);
    };
    fetchEnrollment();
  }, [enrollmentId]);

  // ✅ HOOK ALWAYS CALLED (safe)
  const progressObj = useMemo(() => {
    if (!enrollment?.progress) return {};
    return Object.fromEntries(Object.entries(enrollment.progress));
  }, [enrollment]);

  // ✅ RETURNS AFTER ALL HOOKS
  if (loading) {
    return <p className="p-6 text-gray-500">Loading course…</p>;
  }

  if (!enrollment) {
    return <p className="p-6 text-red-500">Enrollment not found</p>;
  }

  const { courseId } = enrollment;

  const total = courseId.lessons.length;
  const completedCount = Object.values(progressObj).filter(Boolean).length;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  const toggleLesson = async (lessonId) => {
    await api.put(`/enrollments/${enrollmentId}/progress`, {
      lessonId,
      completed: !progressObj[lessonId]
    });
    // refresh state
    const res = await api.get("/enrollments/me");
    setEnrollment(res.data.data.find(e => e._id === enrollmentId));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold">{courseId.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {percent}% completed
          </p>

          <div className="mt-3 h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-indigo-600 rounded transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {courseId.lessons.map(lesson => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              completed={!!progressObj[lesson._id]}
             onToggle={() => toggleLesson(lesson._id.toString())}

            />
          ))}
        </div>
      </div>
    </div>
  );
}
