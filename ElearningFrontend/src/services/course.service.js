import api from "../api/axios";

/* ===========================
   Get Courses
=========================== */
export const getCourses = (params = {}) =>
  api.get("/courses", { params });

/* ===========================
   Get Course By Id
=========================== */
export const getCourseById = (id) =>
  api.get(`/courses/${id}`);

/* ===========================
   Create Course
=========================== */
export const createCourse = (data) =>
  api.post("/courses", data);

/* ===========================
   Update Course
=========================== */
export const updateCourse = (id, data) =>
  api.put(`/courses/${id}`, data);

/* ===========================
   Delete Course
=========================== */
export const deleteCourse = (id) =>
  api.delete(`/courses/${id}`);

/* ===========================
   Upload Thumbnail
=========================== */
export const uploadThumbnail = async (file) => {
  const formData = new FormData();

  formData.append("thumbnail", file);

  const res = await api.post(
    "/courses/upload-thumbnail",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.data;
};