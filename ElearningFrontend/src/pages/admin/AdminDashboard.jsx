import { useEffect, useMemo, useState } from "react";
import { BookOpen, Users, ClipboardList } from "lucide-react";
import { toast } from "react-hot-toast";
import InterviewSubjects from "./InterviewSubjects";
import { MessageSquare } from "lucide-react";
import Notes from "./Notes";
import api from "../../api/axios";

import CourseTable from "./CourseTable";
import UsersTable from "./UsersTable";
import EnrollmentsTable from "./EnrollmentsTable";
import CourseForm from "./CourseForm/CourseForm";

const BASE_TABS = [
  { key: "create", label: "Create Course" },
  { key: "courses", label: "Courses" },
  { key: "users", label: "Users" },
  { key: "enrollments", label: "Enrollments" },
  { key: "interview", label: "Interview Questions" },
  { key: "notes", label: "Notes" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("create");

  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- Fetch Courses ---------------- */

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);

      const res = await api.get("/courses");

      setCourses(res.data.data || []);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ---------------- Save ---------------- */

  const saveCourse = async (data) => {
    try {
      setSaving(true);

      if (selected) {
        await api.put(`/courses/${selected._id}`, data);
        toast.success("Course updated successfully");
      } else {
        await api.post("/courses", data);
        toast.success("Course created successfully");
      }

      await fetchCourses();

      setSelected(null);
      setActiveTab("courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to save course");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- Delete ---------------- */

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;

    try {
      await api.delete(`/courses/${id}`);

      toast.success("Course deleted");

      fetchCourses();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- Tabs ---------------- */

  const tabs = useMemo(() => {
    return BASE_TABS.map((tab) =>
      tab.key === "create" && selected ? { ...tab, label: "Edit Course" } : tab,
    );
  }, [selected]);

  /* ---------------- Dashboard Stats ---------------- */

  const totalCourses = courses.length;

  const publishedCourses = courses.filter((c) => c.published).length;

  const draftCourses = totalCourses - publishedCourses;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="mt-2 text-gray-500">
            Manage courses, users and enrollments.
          </p>
        </div>

        {/* Dashboard Cards */}

        {/* Dashboard Cards */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Courses */}
          <div className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Total Courses</div>

                <div className="mt-2 text-3xl font-bold">{totalCourses}</div>
              </div>

              <BookOpen size={36} className="text-indigo-600" />
            </div>
          </div>

          {/* Published */}
          <div className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Published</div>

                <div className="mt-2 text-3xl font-bold text-green-600">
                  {publishedCourses}
                </div>
              </div>

              <ClipboardList size={36} className="text-green-600" />
            </div>
          </div>

          {/* Draft Courses */}
          <div className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Draft Courses</div>

                <div className="mt-2 text-3xl font-bold text-yellow-600">
                  {draftCourses}
                </div>
              </div>

              <Users size={36} className="text-yellow-600" />
            </div>
          </div>

          {/* Interview Bank */}
          <div className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Interview Bank</div>

                <div className="mt-2 text-3xl font-bold text-purple-600">
                  Manage
                </div>
              </div>

              <MessageSquare size={36} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}

        <div className="rounded-xl bg-white p-2 shadow">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-5 py-2 transition ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}

        <div className="rounded-2xl bg-white p-6 shadow">
          {activeTab === "create" && (
            <CourseForm
              selected={selected}
              onSave={saveCourse}
              onCancel={() => {
                setSelected(null);
                setActiveTab("courses");
              }}
              loading={saving}
            />
          )}

          {activeTab === "courses" && (
            <CourseTable
              courses={courses}
              loading={loadingCourses}
              onEdit={(course) => {
                setSelected(course);
                setActiveTab("create");
              }}
              onDelete={deleteCourse}
            />
          )}

          {activeTab === "users" && <UsersTable />}

          {activeTab === "enrollments" && <EnrollmentsTable />}
          {activeTab === "interview" && <InterviewSubjects />}
          {activeTab === "notes" && <Notes />}
        </div>
      </div>
    </div>
  );
}
