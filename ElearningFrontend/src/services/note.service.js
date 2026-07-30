import api from "../api/axios";

/* ==========================================
            USER
========================================== */

export const getNotes = async (params = {}) => {
  const { data } = await api.get("/notes", {
    params,
  });

  return data;
};

export const getNote = async (id) => {
  const { data } = await api.get(`/notes/${id}`);

  return data;
};

/* ==========================================
            ADMIN
========================================== */

export const createNote = async (formData) => {
  const { data } = await api.post("/notes/admin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateNote = async (id, formData) => {
  const { data } = await api.put(`/notes/admin/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/notes/admin/${id}`);

  return data;
};
