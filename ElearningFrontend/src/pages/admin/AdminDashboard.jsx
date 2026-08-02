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
  <div className="min-h-[calc(100vh-64px)] bg-slate-50">
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* ================= HEADER ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-indigo-100">
              Manage courses, interview resources, notes, enrollments and users
              from one centralized dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/15 px-5 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-indigo-100">
                Courses
              </p>

              <p className="text-2xl font-bold">{totalCourses}</p>
            </div>

            <div className="rounded-xl bg-white/15 px-5 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-indigo-100">
                Published
              </p>

              <p className="text-2xl font-bold">{publishedCourses}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Courses</p>

              <h2 className="mt-2 text-3xl font-bold">{totalCourses}</h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-4">
              <BookOpen className="text-indigo-600" size={30} />
            </div>
          </div>
        </div>

        {/* Published */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Published</p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {publishedCourses}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-4">
              <ClipboardList className="text-green-600" size={30} />
            </div>
          </div>
        </div>

        {/* Draft */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Draft Courses</p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                {draftCourses}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-100 p-4">
              <Users className="text-yellow-600" size={30} />
            </div>
          </div>
        </div>

        {/* Interview */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Interview Bank
              </p>

              <h2 className="mt-2 text-xl font-bold text-purple-600">
                Active
              </h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-4">
              <MessageSquare
                className="text-purple-600"
                size={30}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-2 p-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
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

        {activeTab === "enrollments" && (
          <EnrollmentsTable />
        )}

        {activeTab === "interview" && (
          <InterviewSubjects />
        )}

        {activeTab === "notes" && <Notes />}
      </div>
    </div>
  </div>
);
}
