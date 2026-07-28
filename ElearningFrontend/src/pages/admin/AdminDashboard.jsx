import { useEffect, useState } from "react";
import api from "../../api/axios";
import CourseTable from "./CourseTable";
import CourseForm from "./CourseForm";
import UsersTable from "./UsersTable";
import EnrollmentsTable from "./EnrollmentsTable";
import { toast } from "react-hot-toast";

const BASE_TABS = [
  { key: "create", label: "Create Course" },
  { key: "courses", label: "Courses" },
  { key: "users", label: "Users" },
  { key: "enrollments", label: "Enrollments" }
];





export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("create");

  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data || []);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const tabs = BASE_TABS.map(tab => {
  if (tab.key === "create" && selected) {
    return { ...tab, label: "Edit Course" };
  }
  return tab;
});

  const saveCourse = async (data) => {
    try {
      setSaving(true);

      if (selected) {
        await api.put(`/courses/${selected._id}`, data);
        toast.success("Course updated");
      } else {
        await api.post("/courses", data);
        toast.success("Course created");
      }

      setSelected(null);
      fetchCourses();
      setActiveTab("courses"); // 🔥 UX: auto redirect
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!confirm("Delete this course permanently?")) return;

    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage courses, users, and enrollments
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-2 flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow p-6">

          {activeTab === "create" && (
           <CourseForm
  selected={selected}
  onSave={saveCourse}
  onCancel={() => {
    setSelected(null);
    setActiveTab("create");
  }}
  loading={saving}
/>

          )}

          {activeTab === "courses" && (
            <CourseTable
              courses={courses}
              onEdit={(course) => {
                setSelected(course);
                setActiveTab("create"); // 🔥 UX
              }}
              onDelete={deleteCourse}
            />
          )}

          {activeTab === "users" && <UsersTable />}

          {activeTab === "enrollments" && <EnrollmentsTable />}

        </div>
      </div>
    </div>
  );
}
