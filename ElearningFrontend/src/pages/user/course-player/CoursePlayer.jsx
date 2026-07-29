import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";

import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import LessonNavigation from "./LessonNavigation";
import ProgressBar from "./ProgressBar";

export default function CoursePlayer() {
  const { enrollmentId } = useParams();

  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  /* ---------------- Fetch Enrollment ---------------- */

  const fetchEnrollment = async () => {
    try {
      setLoading(true);

      const res = await api.get("/enrollments/me");

      const found = res.data.data.find(
        (e) => e._id === enrollmentId
      );

      setEnrollment(found || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, [enrollmentId]);

  /* ---------------- Progress Object ---------------- */

  const progressObj = useMemo(() => {
    if (!enrollment?.progress) return {};

    return Object.fromEntries(
      Object.entries(enrollment.progress)
    );
  }, [enrollment]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Enrollment not found.
        </p>
      </div>
    );
  }

  const course = enrollment.courseId;
  const lessons = course.lessons || [];

  const selectedLesson =
    lessons[selectedLessonIndex] || null;

  /* ---------------- Progress ---------------- */

  const completedLessons = Object.values(
    progressObj
  ).filter(Boolean).length;

  const progressPercent = lessons.length
    ? Math.round(
        (completedLessons / lessons.length) * 100
      )
    : 0;

  /* ---------------- Toggle Complete ---------------- */

  const toggleComplete = async () => {
    if (!selectedLesson) return;

    await api.put(
      `/enrollments/${enrollmentId}/progress`,
      {
        lessonId: selectedLesson._id,
        completed:
          !progressObj[selectedLesson._id],
      }
    );

    fetchEnrollment();
  };

  /* ---------------- Navigation ---------------- */

  const previousLesson = () => {
    if (selectedLessonIndex > 0) {
      setSelectedLessonIndex(
        selectedLessonIndex - 1
      );
    }
  };

  const nextLesson = () => {
    if (
      selectedLessonIndex <
      lessons.length - 1
    ) {
      setSelectedLessonIndex(
        selectedLessonIndex + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="border-b bg-white px-8 py-5 shadow-sm">

        <h1 className="text-2xl font-bold">
          {course.title}
        </h1>

        <p className="mt-1 text-gray-500">
          {course.subtitle}
        </p>

        <div className="mt-5">
          <ProgressBar
            progress={progressPercent}
            completed={completedLessons}
            total={lessons.length}
          />
        </div>

      </div>

      {/* Main */}

      <div className="mx-auto flex max-w-7xl gap-6 p-6">

        {/* Sidebar */}

        <LessonSidebar
          lessons={lessons}
          selectedLessonIndex={
            selectedLessonIndex
          }
          progress={progressObj}
          onSelect={setSelectedLessonIndex}
        />

        {/* Content */}

        <div className="flex-1 rounded-xl bg-white p-6 shadow">

          <LessonContent
            lesson={selectedLesson}
            completed={
              !!progressObj[selectedLesson?._id]
            }
            onToggleComplete={
              toggleComplete
            }
          />

          <LessonNavigation
            currentIndex={
              selectedLessonIndex
            }
            totalLessons={
              lessons.length
            }
            onPrevious={
              previousLesson
            }
            onNext={nextLesson}
          />

        </div>

      </div>

    </div>
  );
}